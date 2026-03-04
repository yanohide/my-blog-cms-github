"use client";

import React from "react";

/**
 * 編集時にブロックの境界がわかるように、薄い枠線・改行マーク（¶）を表示するラッパー
 * フォーカス時は枠線を強調
 */
export function BlockWithBoundary(props: React.ComponentProps<"div"> & {
  children?: React.ReactNode;
  renderDefault?: (p: Record<string, unknown>) => React.ReactNode;
  value?: { style?: string };
  focused?: boolean;
  selected?: boolean;
}) {
  const { children, renderDefault, focused, selected } = props;
  const isActive = focused || selected;

  return (
    <div
      style={{
        position: "relative",
        marginBottom: "4px",
        padding: "6px 10px 6px 24px",
        border: isActive
          ? "1px solid rgba(34, 211, 238, 0.5)"
          : "1px dashed rgba(150, 150, 150, 0.4)",
        borderRadius: "4px",
        minHeight: "1.5em",
        backgroundColor: isActive ? "rgba(34, 211, 238, 0.05)" : "transparent",
      }}
    >
      {/* 改行マーク（段落記号 ¶）を左端に表示 */}
      <span
        style={{
          position: "absolute",
          left: "6px",
          top: "6px",
          fontSize: "11px",
          color: isActive ? "rgba(34, 211, 238, 0.8)" : "rgba(150, 150, 150, 0.5)",
          fontFamily: "Georgia, serif",
          pointerEvents: "none",
        }}
        aria-hidden
      >
        ¶
      </span>
      {typeof renderDefault === "function"
          ? renderDefault(props as Record<string, unknown>)
          : children}
    </div>
  );
}
