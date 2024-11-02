// lib/markdownParser.ts
import { readFileSync } from "fs";
import path from "path";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({ html: true });

export const parseMarkdown = (doc: string): string => {
	const filePath = path.join(process.cwd(), "content", `${doc}.md`);
	const content = readFileSync(filePath, "utf-8");
	return md.render(content);
};
