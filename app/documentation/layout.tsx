// app/documentation/layout.tsx
import { ReactNode } from "react";

import DocSidebar from "@/components/DocSidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import "./doc.css";

const DocumentationLayout = ({ children }: { children: ReactNode }) => {
	return (
		<SidebarProvider>
			<DocSidebar />
			<SidebarInset>
				<main className="">
					<div className="sticky top-3 z-50 md:hidden">
						<SidebarTrigger />
					</div>
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DocumentationLayout;
