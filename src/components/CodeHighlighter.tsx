"use client";

import React, { useMemo } from "react";

interface CodeHighlighterProps {
  code: string;
  language: string;
}

export default function CodeHighlighter({ code, language }: CodeHighlighterProps) {
  const highlightedLines = useMemo(() => {
    const lines = code.split("\n");

    return lines.map((line) => {
      if (!line.trim()) {
        return <span className="block min-h-[1.5rem]">&nbsp;</span>;
      }

      // Simple, performant tokenization using regex replacements
      let html = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Language-specific rules
      if (language === "markdown") {
        // Headers
        html = html.replace(/^(#+\s+.*)$/g, '<span class="text-accent font-bold">$1</span>');
        // Bullets
        html = html.replace(/^(\s*[*+-]\s+)/g, '<span class="text-pink-400">$1</span>');
        // Quotes
        html = html.replace(/^(>.*)$/g, '<span class="text-zinc-500 italic">$1</span>');
        // Bold
        html = html.replace(/(\*\*.*?\*\*)/g, '<span class="text-yellow-200 font-semibold">$1</span>');
        // Links
        html = html.replace(/(\[.*?\]\(.*?\))/g, '<span class="text-sky-400">$1</span>');
      } else if (language === "json") {
        // Keys
        html = html.replace(/(".*?")(\s*:)/g, '<span class="text-cyan-400">$1</span>$2');
        // Strings (values)
        html = html.replace(/(:\s*)(".*?")/g, '$1<span class="text-amber-300">$2</span>');
        // Numbers & Booleans
        html = html.replace(/(:\s*)(true|false|null|\d+)/g, '$1<span class="text-orange-400 font-semibold">$2</span>');
      } else if (language === "typescript" || language === "go" || language === "python" || language === "bash") {
        // Comments
        if (line.trim().startsWith("//") || line.trim().startsWith("#")) {
          return <span className="text-zinc-500 italic">{line}</span>;
        }

        // Double quoted strings
        html = html.replace(/(".*?")/g, '<span class="text-amber-200">$1</span>');
        // Single quoted strings
        html = html.replace(/('.*?')/g, '<span class="text-amber-200">$1</span>');
        // Backtick strings
        html = html.replace(/(`.*?`)/g, '<span class="text-emerald-300">$1</span>');

        // Keywords
        const keywords = [
          "import", "export", "const", "return", "function", "type", "interface", "package",
          "func", "struct", "class", "def", "self", "if", "read", "echo", "let", "from",
          "var", "type", "nil", "string", "int", "struct", "class", "for", "in"
        ];
        
        keywords.forEach((keyword) => {
          const reg = new RegExp(`\\b(${keyword})\\b`, "g");
          html = html.replace(reg, '<span class="text-cyan-400 font-medium">$1</span>');
        });

        // Built-ins or types
        const types = ["selectedWork", "Project", "get_academic_history", "GetProfessionalJourney", "Experience", "Education"];
        types.forEach((type) => {
          const reg = new RegExp(`\\b(${type})\\b`, "g");
          html = html.replace(reg, '<span class="text-pink-400 font-medium">$1</span>');
        });
      }

      return <span dangerouslySetInnerHTML={{ __html: html }} className="block" />;
    });
  }, [code, language]);

  return (
    <pre className="font-mono text-sm leading-relaxed overflow-x-auto text-zinc-300 py-4 px-2 w-full">
      <code>
        {highlightedLines.map((lineComponent, idx) => (
          <div key={idx} className="flex hover:bg-zinc-800/20 px-4 transition-colors w-full">
            <span className="text-zinc-600 select-none text-right pr-6 w-10 min-w-[2.5rem]">
              {idx + 1}
            </span>
            <span className="flex-1 whitespace-pre">{lineComponent}</span>
          </div>
        ))}
      </code>
    </pre>
  );
}
