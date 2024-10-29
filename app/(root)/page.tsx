import SearchForm from "@/components/Search/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	const { query } = await searchParams;

	const posts = [
		{
			_createdAt: new Date(),
			_id: "1",
			author: { _id: 1, name: "Elon Musk" },
			title: "We Robots",
			category: "Robotics",
			description: "This is a description",
			image: "https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
			views: 60,
		},
	];

	return (
		<>
			<section className="pink_container">
				<h1 className="heading">
					Pitch Your Startup, <br /> Connect with Enterpreneurs
				</h1>

				<p className="sub-heading !max-w-3xl">
					Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
					Competitions
				</p>
				<SearchForm query={query} />
			</section>

			<section className="section_container">
				<p className="text-30-semibold">
					{query
						? `Search results for "${query}"`
						: "Explore Startups"}
				</p>

				<ul className="mt-7 card_grid">
					{posts.length > 0 ? (
						posts.map((post: StartupTypeCard, index: number) => (
							<StartupCard key={post?._id} post={post} />
						))
					) : (
						<p className="no-results">No startups found</p>
					)}
				</ul>
			</section>
		</>
	);
}
