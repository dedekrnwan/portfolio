"use client";

import { useEffect, useId, useRef } from "react";

type MermaidDiagramProps = {
  chart: string;
};

let initialized = false;

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const renderCountRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      if (!containerRef.current) {
        return;
      }

      const mermaid = (await import("mermaid")).default;

      if (!initialized) {
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          securityLevel: "loose",
          themeVariables: {
            primaryColor: "#eff6ff",
            primaryTextColor: "#111827",
            primaryBorderColor: "#3b82f6",
            lineColor: "#64748b",
            secondaryColor: "#ecfeff",
            tertiaryColor: "#fafaf9",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          },
        });
        initialized = true;
      }

      const renderId = `mermaid-${id}-${renderCountRef.current++}`;
      const { svg, bindFunctions } = await mermaid.render(renderId, chart);

      if (cancelled || !containerRef.current) {
        return;
      }

      containerRef.current.innerHTML = svg;
      bindFunctions?.(containerRef.current);
    }

    renderChart().catch((error) => {
      if (containerRef.current) {
        containerRef.current.innerHTML =
          `<pre class='text-sm text-red-500'>Unable to render diagram.${error instanceof Error ? ` ${error.message}` : ""}</pre>`;
      }
    });

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return <div ref={containerRef} className="mermaid-diagram overflow-x-auto" />;
}
