import { marked } from "marked";

// Configure marked options for Medium-compatible HTML
marked.setOptions({
  gfm: true,
  breaks: false, // Disable automatic line breaks to better handle blockquotes
  pedantic: false,
});

// Utility function for basic markdown conversion
export const convertMarkdown = (content: string): string => {
  if (!content) return "";
  try {
    const html = marked.parse(content);
    if (typeof html !== "string") return "";

    return html;
  } catch (error) {
    console.error("Markdown conversion error:", error);
    return "";
  }
};

// Function to generate preview HTML with classes for CSS styling
export const generatePreviewHTML = (content: string): string => {
  if (!content) return "";

  const baseHTML = convertMarkdown(content);
  if (!baseHTML) return "";

  // Apply CSS classes for preview styling
  let styledHTML = baseHTML;

  // Add classes to headers
  styledHTML = styledHTML.replace(/<h1>/g, '<h1 class="medium-heading">');
  styledHTML = styledHTML.replace(/<h2>/g, '<h2 class="medium-heading">');
  styledHTML = styledHTML.replace(/<h3>/g, '<h3 class="medium-heading">');
  styledHTML = styledHTML.replace(/<h4>/g, '<h4 class="medium-heading">');
  styledHTML = styledHTML.replace(/<h5>/g, '<h5 class="medium-heading">');
  styledHTML = styledHTML.replace(/<h6>/g, '<h6 class="medium-heading">');

  // Add classes to paragraphs
  styledHTML = styledHTML.replace(/<p>/g, '<p class="medium-paragraph">');

  // Medium用にリストを最適化（コピー時の問題を解決）
  // リスト内の段落をより厳密に制御
  styledHTML = styledHTML.replace(
    /<ul>([\s\S]*?)<\/ul>/g,
    (_match, content) => {
      // リスト内の段落要素を除去して、テキストのみにする
      const cleanContent = content.replace(
        /<li>\s*<p>([\s\S]*?)<\/p>\s*<\/li>/g,
        '<li class="medium-list-item">$1</li>',
      );
      return `<ul class="medium-list">${cleanContent}</ul>`;
    },
  );

  styledHTML = styledHTML.replace(
    /<ol>([\s\S]*?)<\/ol>/g,
    (_match, content) => {
      // リスト内の段落要素を除去して、テキストのみにする
      const cleanContent = content.replace(
        /<li>\s*<p>([\s\S]*?)<\/p>\s*<\/li>/g,
        '<li class="medium-list-item">$1</li>',
      );
      return `<ol class="medium-list">${cleanContent}</ol>`;
    },
  );

  // 残りのli要素にもクラスを適用
  styledHTML = styledHTML.replace(/<li>/g, '<li class="medium-list-item">');

  // Medium用にコードブロックを最適化
  styledHTML = styledHTML.replace(
    /<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g,
    (_match, attributes, codeContent) => {
      // コードの内容をエスケープされた状態から元に戻す
      const unescapedCode = codeContent
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      return `<pre class="medium-code-block"><code${attributes}>${unescapedCode}</code></pre>`;
    },
  );

  return styledHTML;
};
