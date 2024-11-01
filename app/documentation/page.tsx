import Link from "next/link";
import React from "react";

const DocsPage = () => {
	return (
		<div className="max-w-4xl mx-auto p-6">
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
		</div>
	);
};

export default DocsPage;
