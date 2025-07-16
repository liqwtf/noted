import { Plus, Settings, Trash } from "lucide-react";
import { Outlet } from "react-router";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import {
	Sidebar,
	SidebarProvider,
	SidebarTrigger,
} from "~/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "~/components/ui/tooltip";

export default function Layout() {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "20rem",
					"--header-height": "calc(100vh - 32px)",
				} as React.CSSProperties
			}
		>
			<Sidebar className="border-none flex">
				<Card className="flex-1 m-2 mr-0" data-tauri-drag-region>
					<CardHeader>
						<CardTitle className="text-xl flex items-center justify-between font-bold">
							notes
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="secondary"
										size="icon"
										className="ml-2 size-7"
									>
										<Plus />
									</Button>
								</TooltipTrigger>
								<TooltipContent>Create Note</TooltipContent>
							</Tooltip>
						</CardTitle>
					</CardHeader>
					<CardContent></CardContent>
					<CardFooter className="mt-auto gap-x-2">
						<Tooltip>
							<Popover>
								<TooltipTrigger asChild>
									<PopoverTrigger asChild>
										<Button
											className="size-8"
											variant={"secondary"}
											size={"icon"}
										>
											<Trash />
										</Button>
									</PopoverTrigger>
								</TooltipTrigger>
								<PopoverContent className="w-64"></PopoverContent>
							</Popover>
							<TooltipContent>Recently Deleted</TooltipContent>
						</Tooltip>
						<Button className="h-8" variant={"secondary"} size={"default"}>
							<Settings />
							Settings
						</Button>
					</CardFooter>
				</Card>
			</Sidebar>
			<Tooltip>
				<TooltipTrigger asChild>
					<SidebarTrigger className="ml-2" />
				</TooltipTrigger>
				<TooltipContent>Toggle Sidebar</TooltipContent>
			</Tooltip>
			<main
				className="flex-1 flex flex-col overflow-hidden mx-auto max-w-6xl pl-8 pr-17"
				style={{
					width: "calc(100vw - var(--sidebar-width))",
					maxHeight: "calc(100vh - var(--title-bar-height))",
				}}
			>
				<Outlet />
			</main>
		</SidebarProvider>
	);
}
