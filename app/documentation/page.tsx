// import { parseMarkdown } from "@/lib/markdownParser";
import Link from "next/link";
import React from "react";

import { readFileSync } from "fs";
import path from "path";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({ html: true });

const DocsPage = () => {
	// const content = parseMarkdown("getting-started");
	const filePath = path.join(process.cwd(), "content", `getting-started.md`);
	console.log(filePath);
	const filecontents = readFileSync(filePath, "utf-8");
	// console.log(filecontents);
	const parsedContent = md.render(filecontents);

	return (
		<main className="max-w-4xl mx-auto p-6">
			<header className="text-center mb-10">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					Welcome to the Documentation
				</h1>
				<p className="text-lg text-gray-600">
					Explore our guides and API documentation to get started with
					building and enhancing your application.
				</p>
			</header>

			<section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
				<Link href="/documentation">
					<div className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white">
						<h2 className="text-2xl font-semibold text-blue-600">
							Getting Started
						</h2>
						<p className="mt-2 text-gray-700">
							Learn how to integrate and work with Sanity for
							content management in your application.
						</p>
					</div>
				</Link>

				<Link href="/documentation/learn">
					<div className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white">
						<h2 className="text-2xl font-semibold text-blue-600">
							General
						</h2>
						<p className="mt-2 text-gray-700">
							Find general information and best practices for
							developing with Next.js and related technologies.
						</p>
					</div>
				</Link>

				<Link href="/documentation/NextRenderindconcepts">
					<div className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white">
						<h2 className="text-2xl font-semibold text-blue-600">
							Next.js Rendering
						</h2>
						<p className="mt-2 text-gray-700">
							Dive into the rendering methods in Next.js, from SSG
							to SSR and ISR.
						</p>
					</div>
				</Link>

				<Link href="/documentation/Rendering_RealTime-Updates">
					<div className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white">
						<h2 className="text-2xl font-semibold text-blue-600">
							Real-time Updates
						</h2>
						<p className="mt-2 text-gray-700">
							Implement real-time content updates with Next.js and
							Sanitys Live Content API.
						</p>
					</div>
				</Link>

				<Link href="/documentation/parsing-md-Files-for-Docs">
					<div className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white">
						<h2 className="text-2xl font-semibold text-blue-600">
							Parsing MD Files for Docs
						</h2>
						<p className="mt-2 text-gray-700">
							Explore how to parse and render Markdown files in
							Next.js for documentation.
						</p>
					</div>
				</Link>
			</section>

			<section>
				<article
					dangerouslySetInnerHTML={{ __html: parsedContent }}
					className="prose max-w-4xl font-work-sans "
				/>
			</section>
		</main>
	);
};

export default DocsPage;
