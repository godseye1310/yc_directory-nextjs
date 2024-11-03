// import React from "react";
import { auth } from "@/auth";
import { StartupCardSkeleton } from "@/components/StartupCard";
import UserStartups from "@/components/UserStartups";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Mail, MailIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const experimental_ppr = true;

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	const session = await auth();
	// console.log(session?.user);
	// console.log(session?.id);

	const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

	if (!user) return notFound();
	return (
		<>
			<section className="profile_container">
				<div className="profile_card">
					<div className="profile_title">
						<h3 className="text-24-black uppercase text-center line-clamp-1">
							{user.name}
						</h3>
					</div>

					<Image
						src={user.image}
						alt={user.name}
						width={220}
						height={220}
						className="profile_image !object-cover bg-stone-300 object-center aspect-square"
					/>

					<div className="flex flex-col items-center gap-1">
						<p className="text-30-extrabold mt-7 text-center">
							@{user?.username}
						</p>
						<div className="flex items-center pt-2 text-white-100/90">
							<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
							<span className="text-xs ">
								Joined{" "}
								{new Date(user?._createdAt).toLocaleDateString(
									"en-US",
									{
										month: "long",
										year: "numeric",
									}
								)}
							</span>
						</div>
					</div>
					<p className="text-center text-sm bg-white-100/75 text-black-100/90 font-semibold rounded-lg inline-flex items-center gap-3 px-2 py-1 my-3 max-xs:w-fit max-xs:text-xs">
						<Mail className="fill-[#a09689] text-[#b3aca2] size-4" />

						{user?.email}
					</p>
					<p className="mt-1 text-center text-14-normal">
						{user?.bio}
					</p>
				</div>

				<div className="flex-1 flex flex-col gap-5 lg:mt-5">
					<p className="text-30-bold ">
						{session?.id === id ? "Your" : `${user.name}`}{" "}
						Startup&apos;s{" "}
						<span className="!text-primary">
							({user.startupCount})
						</span>
					</p>

					<ul className="card_grid-sm">
						{/* todo */}
						<Suspense fallback={<StartupCardSkeleton />}>
							<UserStartups id={id} />
						</Suspense>
					</ul>
				</div>
			</section>
		</>
	);
};

export default UserPage;
