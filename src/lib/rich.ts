export type RichToken =
  | { kind: 'text'; text: string }
  | { kind: 'bold'; text: string }
  | { kind: 'mono'; text: string }
  | { kind: 'ph'; text: string }
  | { kind: 'link'; text: string; target: string };

const PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\{\{[^}]+\}\}|\[[^\]]+\]\([A-Za-z]+\))/;
const LINK = /^\[([^\]]+)\]\(([A-Za-z]+)\)$/;

/**
 * Tiny inline markup used by the dictionaries so translators keep whole sentences:
 * `**bold**`, `` `mono` ``, `{{placeholder}}` and `[label](linkKey)`.
 */
export function parseRich(input: string): RichToken[] {
  const tokens: RichToken[] = [];
  for (const part of input.split(PATTERN)) {
    if (part === '') continue;
    if (part.startsWith('**')) tokens.push({ kind: 'bold', text: part.slice(2, -2) });
    else if (part.startsWith('`')) tokens.push({ kind: 'mono', text: part.slice(1, -1) });
    else if (part.startsWith('{{')) tokens.push({ kind: 'ph', text: part.slice(2, -2) });
    else {
      const link = LINK.exec(part);
      if (link) tokens.push({ kind: 'link', text: link[1], target: link[2] });
      else tokens.push({ kind: 'text', text: part });
    }
  }
  return tokens;
}
