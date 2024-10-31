import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_USER_QUERY } from "@/sanity/lib/queries";

const UserStartups = async ({ id }: { id: string }) => {
	// just to test the loading skeleton.
	// await new Promise((resolve) => setTimeout(resolve, 600));
	const startups = await client.fetch(STARTUPS_BY_USER_QUERY, { id });
	// console.log(startups);

	return (
		<>
			{startups.length > 0 ? (
				startups.map((startup: StartupTypeCard) => (
					<StartupCard key={startup._id} post={startup} />
				))
			) : (
				<p className="no-result">No posts yet</p>
			)}
		</>
	);
};

export default UserStartups;
