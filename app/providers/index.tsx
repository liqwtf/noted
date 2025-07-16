import { TooltipProvider } from "~/components/ui/tooltip";
import { TitleBarProvider } from "~/providers/title-bar";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<TitleBarProvider>
			<TooltipProvider delayDuration={150}>{children}</TooltipProvider>
		</TitleBarProvider>
	);
}
