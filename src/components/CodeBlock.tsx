import { useMemo, useState } from "react";
import { highlightTextNodes } from "../utils/highlight";

type Props = {
	code: string;
	language?: string;
	highlight?: {
		tokens: string[];
		exact: boolean;
	};
};

export function CodeBlock(props: Props) {
	const { code, language = "ts", highlight } = props;
	const [copied, setCopied] = useState(false);

	const lines = useMemo(() => code.replace(/\n$/, "").split("\n"), [code]);

	const onCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 900);
		} catch {
			// no-op: clipboard may be unavailable depending on browser permissions
		}
	};

	return (
		<div className="codeblock" data-language={language}>
			<div className="codeblock__top">
				<div className="codeblock__meta">
					<span className="codeblock__pill">{language}</span>
					<span className="codeblock__lines">{lines.length} lines</span>
				</div>
				<button className="btn btn--ghost" type="button" onClick={onCopy}>
					{copied ? "Copied" : "Copy"}
				</button>
			</div>
			<pre className="codeblock__pre">
				<code>
					{highlight?.tokens?.length
						? highlightTextNodes({
								text: code,
								queryTokens: highlight.tokens,
								exact: highlight.exact,
								className: "hl hl--code",
							})
						: code}
				</code>
			</pre>
		</div>
	);
}
