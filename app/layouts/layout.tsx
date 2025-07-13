// import { Plus } from "lucide-react";
// import { Outlet } from "react-router";
// import { Button } from "~/components/ui/button";
// import {
// 	Card,
// 	CardDescription,
// 	CardHeader,
// 	CardTitle,
// } from "~/components/ui/card";

import { useState } from "react";
import {
	Sidebar,
	SidebarHeader,
	SidebarProvider,
	SidebarTrigger,
} from "~/components/ui/sidebar";

export default function Layout() {
	const [open, setOpen] = useState(true);

	return (
		<SidebarProvider
			open={open}
			onOpenChange={setOpen}
			style={
				{
					"--sidebar-width": "20rem",
				} as React.CSSProperties
			}
		>
			<Sidebar></Sidebar>
			<SidebarTrigger className="ml-2" />
			<main
				className="flex-1 mx-auto pl-8 pr-17"
				style={{
					maxWidth: "calc(100vw - var(--sidebar-width))",
				}}
			></main>
		</SidebarProvider>
	);
}
