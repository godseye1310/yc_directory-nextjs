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
		<section className="section_container">
			<h1>{doc.charAt(0).toUpperCase() + doc.slice(1)}</h1>
			<article
				dangerouslySetInnerHTML={{ __html: content }}
				className="prose max-w-4xl font-work-sans "
			/>
		</section>
	);
};

export default DocumentationPage;
