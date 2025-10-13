import fs from 'fs-extra';

const START = '<gen-start id="';
const END = '<gen-end id="';

export class FileMerger {
  static async mergeProtectedRegions(existingPath: string, newContent: string): Promise<string> {
    if (!(await fs.pathExists(existingPath))) return newContent;
    const existing = await fs.readFile(existingPath, 'utf-8');
    const regions = extractRegions(existing);
    if (regions.size === 0) return newContent;
    let merged = newContent;
    for (const [id, content] of regions) {
      const startMarker = `<!-- ${START}${id}"> -->`;
      const endMarker = `<!-- ${END}${id}"> -->`;
      const pattern = new RegExp(`${escapeRegExp(startMarker)}[\s\S]*?${escapeRegExp(endMarker)}`, 'g');
      const replacement = `${startMarker}\n${content}\n${endMarker}`;
      merged = merged.replace(pattern, replacement);
    }
    return merged;
  }
}

function extractRegions(text: string): Map<string, string> {
  const map = new Map<string, string>();
  const regex = /<!-- <gen-start id="(.*?)"> -->[\r\n]*([\s\S]*?)<!-- <gen-end id="\1"> -->/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text))) {
    map.set(m[1], m[2].trim());
  }
  return map;
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

