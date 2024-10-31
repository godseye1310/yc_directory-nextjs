import { auth, signOut, signIn } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgePlus, LogOut, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
	const session = await auth();

	return (
		<header className="px-5 py-3 bg-white shadow-sm font-work-sans">
			<nav className="flex justify-between items-center">
				<Link href={"/"}>
					<Image src="/logo.png" width={144} height={30} alt="logo" />
				</Link>

				<div className="flex items-center gap-5 text-black">
					{session && session?.user ? (
						<>
							<Link href="/startup/create">
								<span className="max-sm:hidden font-semibold">
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
									<span className="max-sm:hidden font-semibold">
										Logout
									</span>
									<LogOut className="size-6 text-red-500 sm:hidden " />
								</button>
							</form>
							<Link
								href={`/user/${session?.id}`}
								className="flex items-center gap-2"
							>
								<span className="max-sm:hidden font-semibold">
									{session?.user?.name}
								</span>
								<Avatar className="size-10">
									<AvatarImage
										src={session?.user?.image || ""}
										alt={session?.user?.name || ""}
									/>
									<AvatarFallback>AV</AvatarFallback>
								</Avatar>
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
								<button type="submit">Login</button>
							</form>
						</>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
