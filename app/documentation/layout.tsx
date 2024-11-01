// app/documentation/layout.tsx
import { ReactNode } from "react";

import DocSidebar from "@/components/DocSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DocumentationLayout = ({ children }: { children: ReactNode }) => {
	return (
		<SidebarProvider>
			<DocSidebar />
			<SidebarInset>
				<main className="">
					{/* <SidebarTrigger /> */}
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DocumentationLayout;
