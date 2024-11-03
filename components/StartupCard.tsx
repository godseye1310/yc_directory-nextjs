/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formateDate } from "@/lib/utils";
import { Author, Startup } from "@/sanity/types";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
	const {
		_createdAt,
		_id,
		author,
		title,
		category,
		description,
		image,
		views,
	} = post;
	return (
		<li className="startup-card group">
			<div className="flex-between">
				<p className="startup-card_date">{formateDate(_createdAt)}</p>
				<div className="flex gap-1.5">
					<EyeIcon className="size-6 text-primary" />
					<span className="text-16-medium">{views}</span>
				</div>
			</div>

			<div className="flex-between mt-5 gap-5">
				<div className="flex-1">
					<Link href={`/user/${author?._id}`}>
						<p className="text-16-medium line-clamp-1">
							{author?.name}
						</p>
					</Link>
					<Link href={`/startup/${_id}`}>
						<h3 className="text-26-semibold line-clamp-1">
							{title}
						</h3>
					</Link>
				</div>

				<Link href={`/user/${author?._id}`} className="!aspect-square">
					<Image
						src={author?.image!}
						alt={author?.name!}
						width={48}
						height={48}
						className="rounded-full !aspect-square object-cover bg-zinc-600 border border-neutral-300/90"
					/>
				</Link>
			</div>

			<Link href={`/startup/${_id}`}>
				<p className="startup-card_desc">{description}</p>

				<img
					src={image}
					className="startup-card_img"
					alt="startup-card-img"
				/>
			</Link>
			<div className="flex-between gap-3 mt-3">
				<Link href={`/?query=${category?.toLowerCase()}`}>
					<p className="text-16-medium">{category}</p>
				</Link>
				<Button className="startup-card_btn" asChild>
					<Link href={`/startup/${_id}`}>Details</Link>
				</Button>
			</div>
		</li>
	);
};

export const StartupCardSkeleton = () => {
	return (
		<>
			{Array(6)
				.fill(0)
				.map((_, index) => (
					<Skeleton key={index} className="startup-card_skeleton" />
				))}
		</>
	);
};

export default StartupCard;
