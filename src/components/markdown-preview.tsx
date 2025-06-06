import { convertMarkdown, generatePreviewHTML } from "@/lib/utils/markdown";
import type React from "react";
import { useTranslation } from "react-i18next";

interface MarkdownPreviewProps {
  markdownContent: string;
}

export const MarkdownPreview = ({ markdownContent }: MarkdownPreviewProps) => {
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
