import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// 翻訳リソース
const resources = {
  en: {
    translation: {
      // App title and labels
      title: "Markdown to Medium",
      markdownEditor: "Markdown Editor",
      medium: "Medium",
      mediumSubtitle: "copy and paste to medium",

      // Buttons
      help: "Help",
      editMode: "Edit Mode",
      previewMode: "Preview Mode",

      // Help content
      helpTitle: "Markdown Syntax Help",
      helpDescription: "List of Markdown syntax supported by this editor.",

      // Usage section
      usageTitle: "How to Use",
      usageStep1: "Edit Markdown in the left editor",
      usageStep2: "Check preview with 'Preview Mode' button",
      usageStep3: "Select all (Cmd+A) and copy in preview screen",
      usageStep4: "Paste into Medium post editor",
      usageTip:
        "💡 In preview mode, fonts and styles used in Medium posts are applied.",

      // Syntax sections
      headingsTitle: "Headings",
      textStylingTitle: "Text Styling",
      listsTitle: "Lists",
      linksTitle: "Links",
      codeTitle: "Code",
      quotesTitle: "Quotes",

      // Text styling examples
      bold: "**Bold**",
      italic: "*Italic*",
      boldItalic: "***Bold and Italic***",

      // List examples
      unorderedList: "Unordered list:",
      item1: "Item 1",
      item2: "Item 2",
      nestedItem: "Nested item",
      anotherNestedItem: "Another nested item",
      item3: "Item 3",
      orderedList: "Ordered list:",
      firstItem: "First item",
      secondItem: "Second item",
      thirdItem: "Third item",

      // Code examples
      inlineCode: "Inline code:",
      codeBlock: "Code block:",

      // Placeholder text
      placeholderUsage: "【How to Use】",
      placeholderStep1: "1. Edit Markdown here",
      placeholderStep2: "2. Check preview with 'Preview Mode' button",
      placeholderStep3: "3. Select all (Cmd+A) and copy in preview screen",
      placeholderStep4: "4. Paste into Medium post editor",
      placeholderSupportedSyntax: "【Supported Syntax】",
      placeholderQuote: "This is a quote.",
      placeholderMultilineQuote: "Multi-line quotes are also possible.",

      // Preview content
      previewPlaceholder: "Enter something in the editor to display preview.",
    },
  },
  ja: {
    translation: {
      // App title and labels
      title: "Markdown to Medium",
      markdownEditor: "Markdown エディター",
      medium: "Medium",
      mediumSubtitle: "copy and paste to medium",

      // Buttons
      help: "ヘルプ",
      editMode: "Edit Mode",
      previewMode: "Preview Mode",

      // Help content
      helpTitle: "Markdown 記法ヘルプ",
      helpDescription:
        "このエディターでサポートされているMarkdown記法の一覧です。",

      // Usage section
      usageTitle: "使い方",
      usageStep1: "左側のエディターでMarkdownを編集",
      usageStep2: "「Preview Mode」ボタンでプレビューを確認",
      usageStep3: "プレビュー画面でCmd+A（全選択）してコピー",
      usageStep4: "Mediumの投稿画面にペースト",
      usageTip:
        "💡 プレビューモードでは、Mediumの投稿で使用されるフォントとスタイルが適用されます。",

      // Syntax sections
      headingsTitle: "見出し",
      textStylingTitle: "テキスト装飾",
      listsTitle: "リスト",
      linksTitle: "リンク",
      codeTitle: "コード",
      quotesTitle: "引用",

      // Text styling examples
      bold: "**太字（Bold）**",
      italic: "*斜体（Italic）*",
      boldItalic: "***太字と斜体の組み合わせ***",

      // List examples
      unorderedList: "順序なしリスト:",
      item1: "項目1",
      item2: "項目2",
      nestedItem: "ネストした項目",
      anotherNestedItem: "もう一つのネストした項目",
      item3: "項目3",
      orderedList: "順序付きリスト:",
      firstItem: "最初の項目",
      secondItem: "二番目の項目",
      thirdItem: "三番目の項目",

      // Code examples
      inlineCode: "インラインコード:",
      codeBlock: "コードブロック:",

      // Placeholder text
      placeholderUsage: "【使い方】",
      placeholderStep1: "1. ここでMarkdownを編集",
      placeholderStep2: "2. 「Preview Mode」ボタンでプレビューを確認",
      placeholderStep3: "3. プレビュー画面でCmd+A（全選択）してコピー",
      placeholderStep4: "4. Mediumの投稿画面にペースト",
      placeholderSupportedSyntax: "【サポートされている記法】",
      placeholderQuote: "これは引用文です。",
      placeholderMultilineQuote: "複数行にわたって引用することも可能です。",

      // Preview content
      previewPlaceholder:
        "プレビューを表示するには、エディターに何か入力してください。",
    },
  },
};

i18n
  // 言語検出機能を追加
  .use(LanguageDetector)
  // react-i18next をバインド
  .use(initReactI18next)
  // 初期化
  .init({
    resources,
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",

    interpolation: {
      escapeValue: false, // React では JSX が自動でエスケープするため不要
    },

    // 言語検出の設定
    detection: {
      order: ["navigator", "localStorage", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
