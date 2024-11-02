// app/documentation/[doc]/page.tsx
import { parseMarkdown } from "@/lib/markdownParser";

const DocumentationPage = async ({
	params,
}: {
	params: Promise<{ doc: string }>;
}) => {
	const { doc } = await params;
	const content = parseMarkdown(doc);

	return (
		<section className="max-w-4xl mx-auto p-6">
			<h1>{doc.charAt(0).toUpperCase() + doc.slice(1)}</h1>
			<article
				dangerouslySetInnerHTML={{ __html: content }}
				className="prose max-w-4xl font-work-sans "
			/>
		</section>
	);
};

export default DocumentationPage;
