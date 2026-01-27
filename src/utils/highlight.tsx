import React from "react";

function escapeRegExp(input: string) {
	return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function uniqLowerPreserve(tokens: string[]) {
	const seen = new Set<string>();
	const out: string[] = [];

	for (const t of tokens) {
		const trimmed = t.trim();
		if (!trimmed) continue;
		const key = trimmed.toLowerCase();
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(trimmed);
	}

	return out;
}

export function buildHighlightRegex(tokens: string[], exact: boolean) {
	const cleaned = uniqLowerPreserve(tokens).sort((a, b) => b.length - a.length);
	if (cleaned.length === 0) return null;

	const patterns = cleaned.map((t) => {
		const escaped = escapeRegExp(t);
		if (!exact) return escaped;

		// If the token contains non-word characters, \b boundaries can behave oddly.
		// In that case, just do a plain literal match.
		return /^\w+$/.test(t) ? `\\b${escaped}\\b` : escaped;
	});

	return new RegExp(`(${patterns.join("|")})`, "gi");
}

export function highlightTextNodes(args: { text: string; queryTokens: string[]; exact: boolean; className?: string }) {
	const { text, queryTokens, exact, className = "hl" } = args;

	if (!queryTokens.length) return text;

	const re = buildHighlightRegex(queryTokens, exact);
	if (!re) return text;

	const nodes: React.ReactNode[] = [];
	let lastIndex = 0;

	for (;;) {
		const match = re.exec(text);
		if (!match) break;

		const start = match.index;
		const matchedText = match[0] ?? "";

		if (matchedText.length === 0) {
			// Defensive: avoid infinite loops on zero-length matches.
			re.lastIndex += 1;
			continue;
		}

		if (start > lastIndex) nodes.push(text.slice(lastIndex, start));
		nodes.push(
			<mark key={`${start}:${matchedText}`} className={className}>
				{matchedText}
			</mark>,
		);
		lastIndex = start + matchedText.length;
	}

	if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

	return nodes.length ? nodes : text;
}
