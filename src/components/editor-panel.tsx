import type React from "react";

interface EditorPanelProps {
  title: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}

export const EditorPanel = ({
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
