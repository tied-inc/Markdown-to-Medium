import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { marked } from "marked";
import { useState } from "react";
import type React from "react";
import { useTranslation } from "react-i18next";

// Configure marked options for Medium-compatible HTML
marked.setOptions({
  gfm: true,
  breaks: false, // Disable automatic line breaks to better handle blockquotes
  pedantic: false,
});

// Types
interface EditorPanelProps {
  title: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}

interface MarkdownEditorProps {
  onChange: (value: string) => void;
  isPreviewMode: boolean;
}

// Utility function for basic markdown conversion
const convertMarkdown = (content: string): string => {
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
const generatePreviewHTML = (content: string): string => {
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

// Help Content Component
const HelpContent = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 text-sm max-h-[60vh] overflow-auto">
      <section>
        <h3 className="font-semibold text-lg mb-3 text-gray-900 border-b border-gray-200 pb-2">
          {t("usageTitle")}
        </h3>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <ol className="list-decimal list-inside space-y-2 text-gray-800">
            <li className="font-medium">{t("usageStep1")}</li>
            <li className="font-medium">{t("usageStep2")}</li>
            <li className="font-medium">{t("usageStep3")}</li>
            <li className="font-medium">{t("usageStep4")}</li>
          </ol>
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-amber-800 text-sm font-medium">
              {t("usageTip")}
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-lg mb-3 text-gray-900 border-b border-gray-200 pb-2">
          {t("headingsTitle")}
        </h3>
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg font-mono text-sm">
          <div className="text-gray-800"># 見出し1</div>
          <div className="text-gray-800">## 見出し2</div>
          <div className="text-gray-800">### 見出し3</div>
          <div className="text-gray-800">#### 見出し4</div>
          <div className="text-gray-800">##### 見出し5</div>
          <div className="text-gray-800">###### 見出し6</div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-lg mb-3 text-gray-900 border-b border-gray-200 pb-2">
          {t("textStylingTitle")}
        </h3>
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg font-mono text-sm">
          <div className="text-gray-800">{t("bold")}</div>
          <div className="text-gray-800">{t("italic")}</div>
          <div className="text-gray-800">{t("boldItalic")}</div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-lg mb-3 text-gray-900 border-b border-gray-200 pb-2">
          {t("listsTitle")}
        </h3>
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg font-mono text-sm">
          <div className="text-blue-600 font-medium mb-2">
            {t("unorderedList")}
          </div>
          <div className="text-gray-800">- {t("item1")}</div>
          <div className="text-gray-800">- {t("item2")}</div>
          <div className="text-gray-800 ml-4"> - {t("nestedItem")}</div>
          <div className="text-gray-800 ml-4"> - {t("anotherNestedItem")}</div>
          <div className="text-gray-800">- {t("item3")}</div>
          <div className="text-blue-600 font-medium mt-3 mb-2">
            {t("orderedList")}
          </div>
          <div className="text-gray-800">1. {t("firstItem")}</div>
          <div className="text-gray-800">2. {t("secondItem")}</div>
          <div className="text-gray-800">3. {t("thirdItem")}</div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-lg mb-3 text-gray-900 border-b border-gray-200 pb-2">
          {t("linksTitle")}
        </h3>
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg font-mono text-sm">
          <div className="text-gray-800">
            [リンクテキスト](https://example.com)
          </div>
          <div className="text-gray-800">[Google](https://www.google.com)</div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-lg mb-3 text-gray-900 border-b border-gray-200 pb-2">
          {t("codeTitle")}
        </h3>
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg font-mono text-sm">
          <div className="text-blue-600 font-medium mb-2">
            {t("inlineCode")}
          </div>
          <div className="text-gray-800">`console.log("Hello World")`</div>
          <div className="text-blue-600 font-medium mt-3 mb-2">
            {t("codeBlock")}
          </div>
          <div className="text-gray-800">```javascript</div>
          <div className="text-gray-800">function greet(name) {"{"}</div>
          <div className="text-gray-800 ml-4">
            console.log("Hello, " + name + "!");
          </div>
          <div className="text-gray-800">{"}"}</div>
          <div className="text-gray-800">```</div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-lg mb-3 text-gray-900 border-b border-gray-200 pb-2">
          {t("quotesTitle")}
        </h3>
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg font-mono text-sm">
          <div className="text-gray-800">
            {">"} {t("placeholderQuote")}
          </div>
          <div className="text-gray-800">
            {">"} {t("placeholderMultilineQuote")}
          </div>
        </div>
      </section>
    </div>
  );
};

// Editor Panel Component
const EditorPanel = ({
  title,
  subtitle,
  headerAction,
  children,
}: EditorPanelProps) => (
  <div className="h-full">
    <div className="mb-4">
      <div className="flex justify-start gap-4 items-center">
        <h1 className="text-base font-medium">
          {title}
          {subtitle && (
            <span className="text-sm text-gray-500 ml-2">({subtitle})</span>
          )}
        </h1>
        {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
      </div>
    </div>
    <div className="h-[calc(100%-60px)]">{children}</div>
  </div>
);

// Safe HTML renderer component for Medium-style preview
const SafeHtmlRenderer = ({ markdownContent }: { markdownContent: string }) => {
  const { t } = useTranslation();
  const previewHTML = generatePreviewHTML(markdownContent);

  // Handle cmd+A to select only the preview content and copy events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.metaKey && e.key === "a") {
      e.preventDefault();
      e.stopPropagation();

      // Select all content within the current element
      const selection = window.getSelection();
      const range = document.createRange();

      if (selection && range) {
        range.selectNodeContents(e.currentTarget);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  // コピー時の動作を制御
  const handleCopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const container = document.createElement("div");
    container.appendChild(range.cloneContents());

    // リストを段落に変換してコピー
    const lists = container.querySelectorAll("ul, ol");
    for (const list of lists) {
      const items = list.querySelectorAll("li");
      const replacement = document.createElement("div");

      const itemsArray = Array.from(items);
      for (const [index, item] of itemsArray.entries()) {
        const p = document.createElement("p");
        const isOrdered = list.tagName.toLowerCase() === "ol";
        const bullet = isOrdered ? `${index + 1}. ` : "• ";
        p.textContent = bullet + item.textContent;
        p.style.margin = "0";
        p.style.padding = "0";
        replacement.appendChild(p);
      }

      list.parentNode?.replaceChild(replacement, list);
    }

    // カスタムテキストをクリップボードに設定
    e.clipboardData.setData("text/plain", container.textContent || "");
    e.clipboardData.setData("text/html", container.innerHTML);
    e.preventDefault();
  };

  return (
    <div className="h-full p-4 rounded-md overflow-auto bg-white medium-preview">
      <style>{`
        /* Headers - scoped to medium-preview */
        .medium-preview h1, .medium-preview h2, .medium-preview h3, .medium-preview h4, .medium-preview h5, .medium-preview h6, .medium-preview .medium-heading {
          font-family: 'medium-content-sans-serif-font', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Geneva, Arial, sans-serif !important;
          font-weight: 700 !important;
          line-height: 1.15 !important;
          letter-spacing: -0.003em !important;
          margin-top: 56px !important;
          margin-bottom: 6px !important;
          color: rgba(0, 0, 0, 0.8) !important;
        }
        .medium-preview h1 { font-size: 32px !important; }
        .medium-preview h2 { font-size: 24px !important; }
        .medium-preview h3 { font-size: 20px !important; }
        .medium-preview h4 { font-size: 18px !important; }
        .medium-preview h5 { font-size: 16px !important; }
        .medium-preview h6 { font-size: 14px !important; }

        /* Paragraphs - scoped to medium-preview */
        .medium-preview p, .medium-preview .medium-paragraph {
          font-family: 'medium-content-serif-font', Georgia, Cambria, "Times New Roman", Times, serif !important;
          font-size: 20px !important;
          line-height: 1.58 !important;
          letter-spacing: -0.003em !important;
          margin-bottom: 30px !important;
          color: rgba(0, 0, 0, 0.8) !important;
        }

                /* Lists - scoped to medium-preview */
        .medium-preview ul, .medium-preview .medium-list {
          font-family: 'medium-content-serif-font', Georgia, Cambria, "Times New Roman", Times, serif !important;
          font-size: 20px !important;
          line-height: 1.58 !important;
          letter-spacing: -0.003em !important;
          margin: 30px 0 !important;
          padding-left: 30px !important;
          color: rgba(0, 0, 0, 0.8) !important;
          list-style-type: disc !important;
          list-style-position: outside !important;
        }
        .medium-preview ol, .medium-preview .medium-list {
          font-family: 'medium-content-serif-font', Georgia, Cambria, "Times New Roman", Times, serif !important;
          font-size: 20px !important;
          line-height: 1.58 !important;
          letter-spacing: -0.003em !important;
          margin: 30px 0 !important;
          padding-left: 30px !important;
          color: rgba(0, 0, 0, 0.8) !important;
          list-style-type: decimal !important;
          list-style-position: outside !important;
        }
        .medium-preview li, .medium-preview .medium-list-item {
          margin: 0 !important;
          padding: 0 !important;
          color: rgba(0, 0, 0, 0.8) !important;
          font-family: inherit !important;
          font-size: inherit !important;
          line-height: inherit !important;
          letter-spacing: inherit !important;
        }

        /* コピー時の空白削除対策 */
        .medium-preview li::after {
          content: '' !important;
        }
        .medium-preview li p {
          margin: 0 !important;
        }



        /* Links - scoped to medium-preview */
        .medium-preview a {
          color: #1a8917 !important;
          text-decoration: underline !important;
        }

        /* Code - scoped to medium-preview */
        .medium-preview code {
          font-family: 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', Consolas, 'Courier New', monospace !important;
          font-size: 16px !important;
          background: rgba(0, 0, 0, 0.05) !important;
          padding: 2px 4px !important;
          border-radius: 3px !important;
        }

        /* Code blocks - scoped to medium-preview */
        .medium-preview pre {
          background: rgba(0, 0, 0, 0.05) !important;
          border-radius: 3px !important;
          padding: 20px !important;
          margin: 30px 0 !important;
          overflow-x: auto !important;
          white-space: pre-wrap !important;
          word-break: break-word !important;
          font-family: 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', Consolas, 'Courier New', monospace !important;
          font-size: 14px !important;
          line-height: 1.4 !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          /* Medium用の特別なスタイリング */
          display: block !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        .medium-preview pre code {
          background: none !important;
          padding: 0 !important;
          border-radius: 0 !important;
          font-size: inherit !important;
          line-height: inherit !important;
          font-family: inherit !important;
          white-space: inherit !important;
          word-break: inherit !important;
          display: block !important;
        }
      `}</style>
      <div
        className="max-w-none preview-content"
        style={{
          fontFamily:
            'medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif',
          fontSize: "20px",
          lineHeight: "1.58",
          letterSpacing: "-0.003em",
          color: "rgba(0, 0, 0, 0.8)",
        }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onCopy={handleCopy}
        role="textbox"
        aria-label="Medium-style preview content"
        aria-readonly="true"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html:
            previewHTML ||
            `<p class="medium-paragraph">${t("previewPlaceholder")}</p>`,
        }}
      />
      {/* Debug info */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-2 bg-gray-100 text-xs text-gray-600 border rounded">
          <strong>Debug:</strong> HTML length: {previewHTML?.length || 0}
          <details className="mt-2">
            <summary className="cursor-pointer">Show raw HTML</summary>
            <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto max-h-32">
              {convertMarkdown(markdownContent)}
            </pre>
          </details>
          <details className="mt-2">
            <summary className="cursor-pointer">Show processed HTML</summary>
            <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto max-h-32">
              {previewHTML}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

// Enhanced Markdown Editor Component with Preview
const MarkdownEditor = ({ onChange, isPreviewMode }: MarkdownEditorProps) => {
  const { t } = useTranslation();
  const [markdownContent, setMarkdownContent] = useState("");

  // エディターの内容が変更されたときの処理
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;
    setMarkdownContent(content);
    onChange(content);
  };

  return (
    <div className="h-full">
      {isPreviewMode ? (
        <SafeHtmlRenderer markdownContent={markdownContent} />
      ) : (
        <div className="h-full">
          <textarea
            value={markdownContent}
            onChange={handleChange}
            className="w-full h-full p-4 text-sm font-mono border-0 outline-none resize-none bg-white rounded-lg shadow-lg"
            placeholder={`${t("placeholderUsage")}
${t("placeholderStep1")}
${t("placeholderStep2")}
${t("placeholderStep3")}
${t("placeholderStep4")}

${t("placeholderSupportedSyntax")}
# 見出し1
## 見出し2
### 見出し3

${t("bold")} と ${t("italic")} と ${t("boldItalic")}

- ${t("unorderedList")}
  - ネストしたリスト
1. ${t("orderedList")}
2. ${t("secondItem")}

\`インラインコード\`

\`\`\`javascript
コードブロック
function hello() {
  console.log("Hello!");
}
\`\`\`

[リンクテキスト](https://example.com)

> ${t("placeholderQuote")}
> ${t("placeholderMultilineQuote")}`}
            style={{
              fontFamily:
                'Monaco, "SF Mono", Consolas, "Liberation Mono", Menlo, Courier, monospace',
              lineHeight: "1.6",
              fontSize: "14px",
              tabSize: 2,
            }}
          />
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const { t } = useTranslation();
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleMarkdownChange = (content: string) => {
    // Handle markdown content change if needed
    console.log("Markdown content changed:", content);
  };

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const headerAction = (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="Help icon"
            >
              <title>Help icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {t("help")}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle>{t("helpTitle")}</DialogTitle>
            <DialogDescription>{t("helpDescription")}</DialogDescription>
          </DialogHeader>
          <HelpContent />
        </DialogContent>
      </Dialog>
      <button
        type="button"
        onClick={togglePreview}
        className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
      >
        {isPreviewMode ? (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="Edit icon"
            >
              <title>Edit icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 16.757m6.878-6.879a3 3 0 105.656 1.242m0 0l-4.242 4.242M21 3l-9 9.007m0 0l-9 9"
              />
            </svg>
            {t("editMode")}
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="Preview icon"
            >
              <title>Preview icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {t("previewMode")}
          </>
        )}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="h-[calc(100vh-32px)]">
          <EditorPanel title={t("markdownEditor")} headerAction={headerAction}>
            <MarkdownEditor
              onChange={handleMarkdownChange}
              isPreviewMode={isPreviewMode}
            />
          </EditorPanel>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default App;
