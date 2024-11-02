"use client";

import React from "react";
import { Book, FileCode, FileText, HomeIcon } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
	{ title: "Documentation", url: "/documentation", icon: Book },
	{ title: "General", url: "/documentation/learn", icon: FileText },
	{
		title: "Next Rendering",
		url: "/documentation/NextRenderindconcepts",
		icon: FileText,
	},
	{
		title: "Real-time Rendering",
		url: "/documentation/Rendering_RealTime-Updates",
		icon: FileCode,
	},
	{
		title: "Parsing MD Files for Docs",
		url: "/documentation/parsing-md-Files-for-Docs",
		icon: FileText,
	},
	{
		title: "Validations (Image URLs validtion in Form)",
		url: "/documentation/imageURL-validation_inForm",
		icon: FileText,
	},
];

const DocSidebar = () => {
	const pathname = usePathname();
	return (
		<Sidebar variant="inset">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Documentation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={pathname === item.url} // Set isActive based on current pathname
										className={
											pathname === item.url
												? "active-link"
												: "link"
										}
									>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarSeparator />
				<SidebarGroup>
					<SidebarGroupLabel>Back to App</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="/">
										<HomeIcon className="text-primary" />
										<span>Home</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};

export default DocSidebar;
