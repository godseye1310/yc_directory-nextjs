/* eslint-disable @next/next/no-img-element */
import { formateDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
	PLAYLIST_BY_SLUG_QUERY,
	STARTUP_DATA_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = markdownit({ html: true });

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	// Implementing Parallel fetch
	const [post, { select: editorPicks }] = await Promise.all([
		client.fetch(STARTUP_DATA_BY_ID_QUERY, { id }),
		client.fetch(PLAYLIST_BY_SLUG_QUERY, {
			slug: "editor-picks",
		}),
	]);

	// Sequential fetch
	// const post = await client.fetch(STARTUP_DATA_BY_ID_QUERY, { id });

	// const { select: editorPicks } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
	// 	slug: "editor-picks",
	// });

	if (!post) return notFound();

	const parsedContent = md.render(post?.pitch || "");

	return (
		<>
			<section className="pink_container !min-h-[230px]">
				<p className="tag">{formateDate(post?._createdAt)}</p>
				<h1 className="text-16-medium heading">{post.title}</h1>
				<p className="sub-heading !max-w-5xl">{post.description}</p>
			</section>

			<section className="section_container">
				<img
					src={post.image}
					className="w-full h-auto rounded-xl"
					alt={post.title}
				/>

				<div className="space-y-5 mt-10 max-w-4xl mx-auto">
					<div className="flex-between gap-5">
						<Link
							href={`/user/${post.author?._id}`}
							className="flex gap-3 items-center mb-3"
						>
							<Image
								src={post.author?.image}
								width={64}
								height={64}
								alt="avatar"
								className="rounded-full bg-zinc-600 border border-neutral-300/90 drop-shadow-lg shadow-lg shadow-black-300  object-cover aspect-square"
							/>

							<div>
								<p className="text-20-medium">
									{post.author?.name}
								</p>
								<p className="text-16-medium !text-black-300">
									@{post.author?.username}
								</p>
							</div>
						</Link>

						<p className="category-tag">{post.category}</p>
					</div>

					<h3 className="text-30-bold">Pitch Details</h3>
					{parsedContent ? (
						<article
							className="prose max-w-4xl font-work-sans break-all "
							dangerouslySetInnerHTML={{ __html: parsedContent }}
						/>
					) : (
						<p className="no-result">No Pitch Details Provided</p>
					)}
				</div>

				<hr className="divider" />

				{/* TODO: Editor SELECTED STARTUPS */}
				{editorPicks?.length > 0 && (
					<div className="max-w-4xl mx-auto">
						<p className="text-30-semibold !text-primary underline underline-offset-4 uppercase">
							Editor Pick&apos;s
						</p>

						<ul className="mt-7 card_grid-sm">
							{editorPicks.map(
								(post: StartupTypeCard, i: number) => (
									<StartupCard key={i} post={post} />
								)
							)}
						</ul>
					</div>
				)}

				<Suspense fallback={<Skeleton className="view_skeleton" />}>
					<View id={id} />
				</Suspense>
			</section>
		</>
	);
};

export default Page;
