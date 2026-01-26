import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { CodeBlock } from "./components/CodeBlock";
import {
  type TutorialSection,
  type TutorialTopic,
  typeTransformationSections,
} from "./tutorial/typeTransformations";

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tokenizeQuery(input: string) {
  return input
    .trim()
    .split(/\s+/g)
    .map((t) => t.trim())
    .filter(Boolean);
}

function matchesHaystack(args: {
  haystack: string;
  queryTokens: string[];
  exact: boolean;
}) {
  const { haystack, queryTokens, exact } = args;

  if (queryTokens.length === 0) return false;

  if (!exact) {
    return queryTokens.every((t) => haystack.includes(t));
  }

  return queryTokens.every((t) => {
    const escaped = escapeRegExp(t);
    const re = new RegExp(`\\b${escaped}\\b`, "i");
    return re.test(haystack);
  });
}

function TopicIO(props: { topic: TutorialTopic }) {
  const io = props.topic.io;
  if (!io) return null;

  return (
    <div className="iogrid" aria-label="Type transformation summary">
      <div className="iocell">
        <div className="iolabel">Input</div>
        <pre className="iovalue">{io.input}</pre>
      </div>
      <div className="iocell">
        <div className="iolabel">Transform</div>
        <pre className="iovalue">{io.transform}</pre>
      </div>
      <div className="iocell">
        <div className="iolabel">Output</div>
        <pre className="iovalue">{io.output}</pre>
      </div>
    </div>
  );
}

function App() {
  const [activeSectionId, setActiveSectionId] = useState(
    typeTransformationSections[0]?.id ?? "extracting-types",
  );
  const [query, setQuery] = useState("");
  const [exactSearch, setExactSearch] = useState(true);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const activeSection =
    typeTransformationSections.find((s) => s.id === activeSectionId) ??
    typeTransformationSections[0];

  const allTopicsCount = useMemo(
    () =>
      typeTransformationSections.reduce((sum, s) => sum + s.topics.length, 0),
    [],
  );

  const normalizedQuery = query.trim().toLowerCase();
  const queryTokens = useMemo(
    () => tokenizeQuery(normalizedQuery),
    [normalizedQuery],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (e.ctrlKey && key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const searchResults = useMemo(() => {
    if (!normalizedQuery)
      return [] as Array<{ section: TutorialSection; id: string }>;

    const results: Array<{ section: TutorialSection; id: string }> = [];

    for (const section of typeTransformationSections) {
      for (const topic of section.topics) {
        const haystack = [
          section.title,
          section.description,
          topic.title,
          topic.summary,
          topic.details ?? "",
          topic.tags.join(" "),
          topic.code,
        ]
          .join("\n")
          .toLowerCase();

        if (
          matchesHaystack({
            haystack,
            queryTokens,
            exact: exactSearch,
          })
        ) {
          results.push({ section, id: topic.id });
        }
      }
    }

    return results;
  }, [normalizedQuery, queryTokens, exactSearch]);

  type ResolvedTopic = { section: TutorialSection; topic: TutorialTopic };

  const resolvedTopics = useMemo<ResolvedTopic[]>(() => {
    if (!normalizedQuery) return [];

    const items: ResolvedTopic[] = [];

    for (const { section, id } of searchResults) {
      const topic = section.topics.find((t) => t.id === id);
      if (topic) items.push({ section, topic });
    }

    return items;
  }, [normalizedQuery, searchResults]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__brand">
          <div className="brand__title">TypeScript Master</div>
          <div className="brand__subtitle">
            Fast visual reference for TypeScript type transformations
          </div>
        </div>

        <div className="topbar__search">
          <label className="sr-only" htmlFor="search">
            Search topics
          </label>
          <input
            id="search"
            className="input"
            placeholder="Search (Ctrl+K): ReturnType, infer, mapped types…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={searchInputRef}
          />
          <div className="topbar__stats">
            <label
              className="toggle"
              title="Exact match avoids infer → inference"
            >
              <input
                type="checkbox"
                checked={exactSearch}
                onChange={(e) => setExactSearch(e.target.checked)}
              />
              <span>Exact</span>
            </label>
            <span className="topbar__statsText">
              {normalizedQuery
                ? `${resolvedTopics.length} matches`
                : `${allTopicsCount} topics`}
            </span>
          </div>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar" aria-label="Tutorial sections">
          <div className="sidebar__title">Sections</div>
          <nav className="sidebar__nav">
            {typeTransformationSections.map((s) => {
              const active = s.id === activeSectionId;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`sidebar__item ${active ? "is-active" : ""}`}
                  onClick={() => setActiveSectionId(s.id)}
                >
                  <div className="sidebar__itemTitle">{s.title}</div>
                  <div className="sidebar__itemMeta">
                    {s.topics.length} topics
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="main">
          {normalizedQuery ? (
            <>
              <div className="panel panel--hero">
                <h2 className="h2">Search results</h2>
                <p className="muted">
                  Tip: try keywords like “keyof”, “as const”, “template
                  literal”, “infer”, or “DeepPartial”.
                </p>
              </div>

              <div className="topics">
                {resolvedTopics.map(({ section, topic }) => (
                  <article key={`${section.id}:${topic.id}`} className="topic">
                    <div className="topic__header">
                      <div>
                        <div className="topic__section">{section.title}</div>
                        <h3 className="topic__title">{topic.title}</h3>
                        <p className="topic__summary">{topic.summary}</p>
                      </div>
                      <div className="topic__tags">
                        {topic.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {topic.details ? (
                      <p className="topic__details">{topic.details}</p>
                    ) : null}

                    <TopicIO topic={topic} />

                    <CodeBlock code={topic.code} language="ts" />
                  </article>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="panel panel--hero">
                <h2 className="h2">{activeSection.title}</h2>
                <p className="muted">{activeSection.description}</p>

                <div className="chiprow" aria-label="Quick navigation">
                  {activeSection.topics.map((t) => (
                    <a key={t.id} className="chip" href={`#${t.id}`}>
                      {t.title}
                    </a>
                  ))}
                </div>
              </div>

              <div className="topics">
                {activeSection.topics.map((topic) => (
                  <article key={topic.id} className="topic" id={topic.id}>
                    <div className="topic__header">
                      <div>
                        <h3 className="topic__title">{topic.title}</h3>
                        <p className="topic__summary">{topic.summary}</p>
                      </div>
                      <div className="topic__tags">
                        {topic.tags.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {topic.details ? (
                      <p className="topic__details">{topic.details}</p>
                    ) : null}

                    <TopicIO topic={topic} />

                    <CodeBlock code={topic.code} language="ts" />
                  </article>
                ))}
              </div>
            </>
          )}

          <footer className="footer">
            <div className="footer__inner">
              <span className="muted">
                Source notes: Total TypeScript (summarized)
              </span>
              <a
                className="link"
                href="https://www.typescriptlang.org/docs/"
                target="_blank"
                rel="noreferrer"
              >
                TypeScript docs
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
