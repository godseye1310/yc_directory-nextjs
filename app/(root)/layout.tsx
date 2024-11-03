import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { BookOpenText } from "lucide-react";
import Link from "next/link";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<main className="font-work-sans relative">
			<Navbar />
			{children}

			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger asChild>
						<Badge
							variant="outline"
							className="fixed bottom-10 left-5 bg-black/50 z-50 shadow-lg !p-0"
						>
							<Link
								href="/documentation"
								className="group w-full h-full cursor-pointer px-3 py-1 !backdrop-blur-sm"
							>
								<BookOpenText className="text-stone-100 text-opacity-60 group-hover:text-opacity-90" />
							</Link>
						</Badge>
					</TooltipTrigger>
					<TooltipContent
						className="text-stone-100 bg-slate-700/90"
						sideOffset={5}
						side="top"
					>
						<p>View Documentation</p>
						<TooltipArrow className="fill-slate-700/90" />
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</main>
	);
}
