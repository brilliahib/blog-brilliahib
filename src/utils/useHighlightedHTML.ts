import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRemoveNotationEscape,
} from "@shikijs/transformers";

export function useHighlightedHTML(rawHtml: string) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    async function highlight() {
      const isDark =
        typeof window !== "undefined" &&
        (document.documentElement.classList.contains("dark") ||
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      const highlighted = await highlightCodeBlocks(
        rawHtml,
        isDark ? "dark" : "light"
      );
      setHtml(highlighted);
    }
    highlight();
  }, [rawHtml]);

  return html;
}

export async function highlightCodeBlocks(
  html: string,
  theme: "light" | "dark" = "dark"
): Promise<string> {
  const regex =
    /<pre(?:><code(?: class="language-(\w+)")?>|>)([\s\S]*?)(?:<\/code>)?<\/pre>/g;

  return await replaceAsync(html, regex, async (_match, lang, rawCode) => {
    const decoded = decodeHTMLEntities(rawCode);
    const highlighted = await codeToHtml(decoded, {
      lang: lang || "tsx",
      theme: theme === "light" ? "github-light" : "dracula",
      transformers: [
        transformerNotationHighlight(),
        transformerNotationDiff(),
        transformerNotationWordHighlight(),
        transformerRemoveNotationEscape(),
        transformerMetaHighlight(),
      ],
    });

    return `
        <div class="relative group">
          <button
            class="absolute right-2 top-2 z-10 hidden group-hover:flex items-center gap-1 text-xs bg-muted text-foreground px-2 py-1 rounded-md border border-border hover:bg-muted/80 transition"
            onclick="navigator.clipboard.writeText(this.parentElement.querySelector('code').textContent).then(() => window.dispatchEvent(new CustomEvent('show-copy-toast')))"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-2 12h6a2 2 0 002-2v-8a2 2 0 00-2-2h-6a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button>
          ${highlighted}
        </div>
      `;
  });
}

async function replaceAsync(
  str: string,
  regex: RegExp,
  asyncFn: (match: string, lang: string, rawCode: string) => Promise<string>
) {
  const matches = [...str.matchAll(regex)];
  const results = await Promise.all(
    matches.map((match) => asyncFn(match[0], match[1], match[2]))
  );
  return matches.reduce((acc, match, i) => {
    return acc.replace(match[0], results[i]);
  }, str);
}

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
