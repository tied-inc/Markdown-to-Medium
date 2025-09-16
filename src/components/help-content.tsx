import { useTranslation } from "react-i18next";

export const HelpContent = () => {
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
          <div className="text-gray-800"># {t("heading1")}</div>
          <div className="text-gray-800">## {t("heading2")}</div>
          <div className="text-gray-800">### {t("heading3")}</div>
          <div className="text-gray-800">#### {t("heading4")}</div>
          <div className="text-gray-800">##### {t("heading5")}</div>
          <div className="text-gray-800">###### {t("heading6")}</div>
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
            [{t("linkText")}](https://example.com)
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
