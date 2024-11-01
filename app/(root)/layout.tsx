import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { BookOpenText } from "lucide-react";
import Link from "next/link";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<main className="font-work-sans">
			<Navbar />
			{children}
			<Badge
				variant="outline"
				className="fixed bottom-10 left-5 bg-black/50 z-50 shadow-lg !p-0"
			>
				<Link
					href="/documentation"
					title="Documentation"
					className="group w-full h-full cursor-pointer px-3 py-1 !backdrop-blur-sm"
				>
					<BookOpenText className="text-stone-100 text-opacity-60 group-hover:text-opacity-90" />
				</Link>
			</Badge>
		</main>
	);
}
