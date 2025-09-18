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
      // Deteksi dark mode otomatis
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
      lang: lang || "ts",
      theme: theme === "light" ? "github-light" : "dracula",
      transformers: [
        transformerNotationHighlight(),
        transformerNotationDiff(),
        transformerNotationWordHighlight(),
        transformerRemoveNotationEscape(),
        transformerMetaHighlight(),
      ],
    });

    return `<div class="relative group">${highlighted}</div>`;
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
