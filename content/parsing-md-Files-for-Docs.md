# Markdown Parsing in Next.js: Explanation of `lib/markdownParser.ts`

This file, `lib/markdownParser.ts`, is responsible for reading Markdown files from the `/content` directory, converting the content into HTML using the `markdown-it` library, and passing the HTML to a page component for rendering in Next.js.

## Code in `lib/markdownParser.ts`

```typescript
import { readFileSync } from "fs";
import path from "path";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

export const parseMarkdown = (doc: string): string => {
	const filePath = path.join(process.cwd(), "content", `${doc}.md`);
	const content = readFileSync(filePath, "utf-8");
	return md.render(content);
};
```

## Detailed Explanation of Each Part

Let’s go through this line-by-line to understand each part and how it contributes to the Markdown parsing and rendering process.

### 1. Importing Necessary Modules

```typescript
import { readFileSync } from "fs";
import path from "path";
import MarkdownIt from "markdown-it";
```

Importing the `readFileSync` and `path` modules from the `fs` module, and the `MarkdownIt` module from the `markdown-it` library.

-   `readFileSync` from `fs`: This function is part of Node.js's `fs` (file system) module, which allows us to read files from the server's file system. `readFileSync` reads the content of a specified file synchronously and returns it as a string.
-   `path` module: This Node.js module helps with constructing file paths that are platform-independent (it works regardless of the operating system).
-   `MarkdownIt` library: `MarkdownIt` is an external library used for parsing Markdown syntax into HTML. It provides a function, `render`, which takes a Markdown string and converts it into an HTML string.

### 1. Initializing the Markdown Parser

```typescript
const md = new MarkdownIt();
```

-   Creating a new instance of the `MarkdownIt` library, which is used to parse Markdown syntax into HTML.

### 3. Defining the parseMarkdown Function

```typescript
export const parseMarkdown = (doc: string): string => {
	const filePath = path.join(process.cwd(), "content", `${doc}.md`);
	const content = readFileSync(filePath, "utf-8");
	return md.render(content);
};
```

This function does the main work of locating, reading, and converting a Markdown file into HTML. Here’s what each line does:

1.  **Function Declaration and Parameters**:

-   `parseMarkdown` is declared as an `export` so it can be imported in other files.
-   It takes a `doc` parameter of type `string`, representing the filename (without the `.md` extension) for the Markdown file.

2.  **Constructing the File Path:**:

```typescript
const filePath = path.join(process.cwd(), "content", `${doc}.md`);
```

-   The `path` module is used to construct the file path for the Markdown file.
-   The `join` method is used to join the `process.cwd()` (current working directory) with the `content` directory and the `doc` parameter.
-   `path.join`: This combines multiple path segments to form a complete file path. Here’s how it works:

    -   `process.cwd()` returns the current working directory of the server, usually the root of the Next.js project.
    -   `'content'` is the directory we created to store Markdown files.
    -   `${doc}.md` appends the file name (taken from the function argument) and the .md extension, forming the final file path.

-   **Result**: For a parameter `doc` with a value like `"learn"`, the full path would be something like `"/path/to/your/project/content/learn.md"`.

3.  **Reading the File Content:**:

```typescript
const content = readFileSync(filePath, "utf-8");
```

-   The `readFileSync` function is used to read the content of the Markdown file.
-   `readFileSync` takes two arguments: the `filePath` and the `encoding` (which is set to `'utf-8'`).
-   The `readFileSync` function returns the content of the file as a string.
-   **Result**: The `content` variable now contains the content of the RAW Markdown file.

4.  **Converting Markdown to HTML:**:

```typescript
return md.render(content);
```

-   The `md.render` function is used to convert the Markdown content into HTML.
-   **Return Value**: This returns the HTML string, which is the final result of the function. This HTML can be safely rendered in the frontend.

## Usage of `parseMarkdown` in Next.js Page Component (`[doc]/page.tsx`)

The parseMarkdown function is called in a dynamic route file ([doc]/page.tsx). Here’s how it works together with Next.js:

```typescript
// app/documentation/[doc]/page.tsx
import { parseMarkdown } from '@/lib/markdownParser';

interface DocumentationPageProps {
  params: {
    doc: string;
  };
}

const DocumentationPage = ({ params }: DocumentationPageProps) => {
  const { doc } = params;
  const content = parseMarkdown(doc);

  return (
    <div>
      <h1>{doc.charAt(0).toUpperCase() + doc.slice(1)}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default DocumentationPage;
```

### Explanation of the `[doc]/page.tsx` Component

1. **Dynamic Routing (`[doc]`):**
   [doc] in the file path `([doc]/page.tsx)` indicates a dynamic route in Next.js. When a user navigates to `/documentation/learn`, the value `learn` is assigned to `params.doc`.
2. **Fetching and Parsing Markdown:**
   `parseMarkdown(doc)` is called with the `doc` parameter to fetch and convert the corresponding Markdown file into HTML.
3. **Rendering HTML Content with `dangerouslySetInnerHTML`:**
   Since we’re converting Markdown to HTML, we use `dangerouslySetInnerHTML` to render this HTML string in the component.
4. **Type Safety:**
   `DocumentationPageProps` interface defines the expected structure for params to ensure `doc` is always a string, enforcing type safety for TypeScript users.

### Summary

-   lib/markdownParser.ts: A utility file that reads Markdown files from the `/content` directory, converts them to HTML using `markdown-it`, and exports the `parseMarkdown` function.
-   Dynamic Route in `[doc]/page.tsx`: This page component calls `parseMarkdown` based on the `doc` parameter in the URL and renders the HTML content, allowing you to access multiple documentation pages dynamically.
