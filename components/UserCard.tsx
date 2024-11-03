import { CalendarIcon, RocketIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { HoverCardArrow } from "@radix-ui/react-hover-card";
import { UserRound } from "lucide-react";
import { formateDate } from "@/lib/utils";

const UserCard = async ({
	id,
	name,
	avatarImg,
}: {
	id: string;
	name: string;
	avatarImg: string;
}) => {
	const { username, _createdAt, startupCount } = await client.fetch(
		AUTHOR_BY_ID_QUERY,
		{ id }
	);
	// console.log(user);

	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Avatar className="size-12 bg-zinc-600 border border-neutral-300/90">
					<AvatarImage src={avatarImg} alt={name} />
					<AvatarFallback className="p-1.5">
						<UserRound className="fill-neutral-500 text-stone-600 size-full" />
					</AvatarFallback>
				</Avatar>
			</HoverCardTrigger>
			<HoverCardContent
				align="end"
				sideOffset={3}
				side="bottom"
				className="w-fit max-w-[300px] rounded-md bg-zinc-100 p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
			>
				<div className="flex justify-center gap-x-4">
					<Avatar className="size-10 bg-zinc-600 border border-neutral-300/90">
						<AvatarImage src={avatarImg} alt={username} />
						<AvatarFallback>
							<UserRound />
						</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<h4 className="text-sm font-semibold">{name}</h4>
						<p className="text-sm font-medium text-zinc-500 !text-opacity-90">
							@{username}
						</p>

						<div className="flex items-center pt-2">
							<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
							<span className="text-xs text-muted-foreground">
								Joined {formateDate(_createdAt)}
							</span>
						</div>
						<div className="flex items-center pt-2">
							<RocketIcon className="mr-2 h-4 w-4 opacity-70" />
							<p className="text-xs font-semibold text-muted-foreground">
								Startup's Pitched:
								<span className="text-sm font-bold text-zinc-900 ml-1.5">
									{startupCount}
								</span>
							</p>
						</div>
					</div>
				</div>
				<HoverCardArrow className="fill-zinc-600" />
			</HoverCardContent>
		</HoverCard>
	);
};

export default UserCard;
