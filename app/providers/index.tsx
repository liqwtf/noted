import { SidebarProvider } from "~/components/ui/sidebar";
import { TooltipProvider } from "~/components/ui/tooltip";
import { EditorProvider } from "~/providers/editor";
import { TitleBarProvider } from "~/providers/title-bar";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<TitleBarProvider>
			<SidebarProvider>
				<TooltipProvider delayDuration={150}>
					<EditorProvider>{children}</EditorProvider>
				</TooltipProvider>
			</SidebarProvider>
		</TitleBarProvider>
	);
}
