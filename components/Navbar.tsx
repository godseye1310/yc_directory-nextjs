import { auth, signOut, signIn } from "@/auth";

import UserCard from "@/components/UserCard";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
	const session = await auth();

	return (
		<header className="px-6 py-1.5 bg-white/75 backdrop-blur-sm shadow-sm font-work-sans sticky top-0 w-full z-[60]">
			<nav className="flex justify-between items-center min-h-12">
				<Link href={"/"}>
					<Image src="/logo.png" width={144} height={30} alt="logo" />
				</Link>

				<div className="flex items-center gap-5 text-black">
					{session && session?.user ? (
						<>
							<Link href="/startup/create">
								<span className="max-sm:hidden font-semibold hover:text-primary px-2 py-1 text-center text-sm inline-block cursor-pointer uppercase transition duration-200 ease-in-out rounded-md hover:bg-rose-300 active:scale-95">
									Create
								</span>
								<BadgePlus className="size-7 text-primary sm:hidden" />
							</Link>
							<form
								action={async () => {
									"use server";
									await signOut({ redirectTo: "/" });
								}}
							>
								<button
									type="submit"
									className="flex items-center relative"
								>
									<span className="max-sm:hidden font-semibold text-red-500/90 hover:text-red-600 px-2 py-1 text-center inline-block transition duration-200 ease-in-out rounded-md hover:bg-red-300 active:scale-95">
										Logout
									</span>
									<span className="bg-red-500/15 p-1 rounded text-red-500 sm:hidden">
										<LogOut className="size-6  " />
									</span>
								</button>
							</form>
							<Link
								href={`/user/${session?.id}`}
								className="flex items-center gap-2"
							>
								<UserCard
									id={session?.id}
									name={session?.user?.name || ""}
									avatarImg={session?.user?.image || ""}
								/>
							</Link>
						</>
					) : (
						<>
							<form
								action={async () => {
									"use server";

									await signIn("github");
								}}
							>
								<button
									type="submit"
									className="font-semibold text-primary px-3 py-1 text-center inline-block cursor-pointer transition duration-200 ease-in-out rounded-md bg-black-100 hover:bg-black-200 active:scale-95"
								>
									Login
								</button>
							</form>
						</>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
