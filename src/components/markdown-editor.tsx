import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MarkdownPreview } from "./markdown-preview";

interface MarkdownEditorProps {
  onChange: (value: string) => void;
  isPreviewMode: boolean;
}

export const MarkdownEditor = ({
  onChange,
  isPreviewMode,
}: MarkdownEditorProps) => {
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
        <MarkdownPreview markdownContent={markdownContent} />
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
