import { SidebarProvider } from "~/components/ui/sidebar";
import { TitleBarProvider } from "~/providers/title-bar";

export default function Providers({ children }: { children: React.ReactNode }) {
	return <TitleBarProvider>{children}</TitleBarProvider>;
}
