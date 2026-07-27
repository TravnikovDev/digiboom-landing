import React from "react";

/**
 * Render a translatable string that carries a small, whitelisted set of inline tags,
 * so a whole sentence stays one translatable unit (word order and emphasis intact)
 * instead of being chopped into fragments the way key-splitting would force.
 *
 * Supported out of the box: <mark>, <strong>/<b>, <em>, and a literal "\n" for <br>.
 * Pass extra renderers for context-specific tags (e.g. an <accent> whose colour
 * depends on the surrounding section). Unknown tags render literally, never crash.
 *
 * Content is authored by us in messages/*.json (not user input), so this favours
 * simplicity over hardening; it is safe for both server and client components
 * because it uses no hooks and returns plain React nodes.
 */
export type TagRenderer = (children: React.ReactNode, key: number) => React.ReactNode;

const DEFAULT_TAGS: Record<string, TagRenderer> = {
  mark: (c, k) => (
    <span key={k} className="mark">
      {c}
    </span>
  ),
  strong: (c, k) => <strong key={k}>{c}</strong>,
  b: (c, k) => <strong key={k}>{c}</strong>,
  em: (c, k) => <em key={k}>{c}</em>,
};

export function rich(text: string, tags: Record<string, TagRenderer> = {}): React.ReactNode {
  const renderers = { ...DEFAULT_TAGS, ...tags };
  const re = /<(\/?)([a-zA-Z]+)>|\n/g;

  type Frame = { tag: string | null; nodes: React.ReactNode[] };
  const root: Frame = { tag: null, nodes: [] };
  const stack: Frame[] = [root];
  const top = () => stack[stack.length - 1];
  const pushText = (s: string) => {
    if (s) top().nodes.push(s);
  };

  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    pushText(text.slice(last, m.index));
    last = re.lastIndex;

    if (m[0] === "\n") {
      top().nodes.push(<br key={key++} />);
      continue;
    }

    const tag = m[2];
    if (!renderers[tag]) {
      pushText(m[0]); // unknown tag: keep the literal text
      continue;
    }

    if (m[1] === "/") {
      // closing tag — only pop if it matches the open frame, else treat literally
      if (top().tag === tag && stack.length > 1) {
        const frame = stack.pop()!;
        top().nodes.push(renderers[frame.tag!](frame.nodes, key++));
      } else {
        pushText(m[0]);
      }
    } else {
      stack.push({ tag, nodes: [] });
    }
  }
  pushText(text.slice(last));

  // Flush any unclosed frames as literal wrappers so nothing is silently dropped.
  while (stack.length > 1) {
    const frame = stack.pop()!;
    top().nodes.push(renderers[frame.tag!](frame.nodes, key++));
  }

  return root.nodes;
}
