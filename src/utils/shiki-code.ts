import { codeToHtml } from "shiki";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRemoveNotationEscape,
} from "@shikijs/transformers";

export async function highlightCodeBlocks(
  html: string,
  theme: string = "dracula"
): Promise<string> {
  return await replaceAsync(
    html,
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
    async (_: string, lang: string, rawCode: string) => {
      const decoded = decodeHTMLEntities(rawCode);
      return await codeToHtml(decoded, {
        lang: lang || "ts",
        theme: theme,
        transformers: [
          transformerNotationHighlight(),
          transformerNotationDiff(),
          transformerNotationWordHighlight(),
          transformerRemoveNotationEscape(),
          transformerMetaHighlight(),
        ],
      });
    }
  );
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
