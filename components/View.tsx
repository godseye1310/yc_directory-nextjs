import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { Eye } from "lucide-react";
import React from "react";

const View = async ({ id }: { id: string }) => {
	const { views: totalViews } = await client
		.withConfig({ useCdn: false })
		.fetch(STARTUP_VIEWS_QUERY, {
			id,
		});

	// TODO: Update the number of view count

	return (
		<div className="view-container ">
			<div className="absolute -top-2 -right-2">
				<Ping />
			</div>
			<p className="view-text">
				<span className="font-black flex gap-3 items-center">
					<Eye strokeWidth={3} className="text-primary size-5" />
					<span>{totalViews}</span>
				</span>
			</p>
		</div>
	);
};

export default View;
