import { client } from "@/sanity/lib/client";
import { STARTUP_DATA_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	const post = await client.fetch(STARTUP_DATA_BY_ID_QUERY, { id });

	if (!post) return notFound();

	return (
		<>
			<h1 className="text-3xl">This is startup ID : {id}</h1>
			<div>
				<h1 className="text-16-medium heading">{post.title}</h1>
				<pre>{JSON.stringify(post, null, 2)}</pre>
			</div>
		</>
	);
};

export default Page;
