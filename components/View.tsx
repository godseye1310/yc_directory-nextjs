import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { Eye } from "lucide-react";
import { unstable_after as after } from "next/server";

const View = async ({ id }: { id: string }) => {
	const { views: totalViews } = await client
		.withConfig({ useCdn: false })
		.fetch(STARTUP_VIEWS_QUERY, {
			id,
		});

	// TODO: Update the number of view count
	after(
		async () =>
			await writeClient
				.patch(id)
				.set({ views: totalViews + 1 })
				.commit()
	);

	// console.log(totalViews);

	return (
		<div className="view-container ">
			<div className="absolute -top-2 -right-2">
				<Ping />
			</div>
			<p className="view-text">
				<span className="font-black flex gap-3 items-center">
					<Eye strokeWidth={3} className="text-primary size-5" />
					<span>{totalViews ? `${totalViews + 1}` : 0}</span>
				</span>
			</p>
		</div>
	);
};

export default View;
