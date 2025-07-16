import { Close, Maximize, Minimize, Restore } from "~/components/icons";
import { cn } from "~/lib/utils";
import { useTitleBar } from "~/providers/title-bar";

export function TitleBar({ className }: { className?: string }) {
	const { minimize, toggleMaximize, close, isMaximized } = useTitleBar();

	const buttons: {
		key: string;
		icon: React.ReactNode;
		onClick: () => void;
	}[] = [
		{
			key: "minimize",
			icon: <Minimize />,
			onClick: () => minimize(),
		},

		{
			key: "maximize",
			icon: isMaximized ? <Restore /> : <Maximize />,
			onClick: () => toggleMaximize(),
		},

		{
			key: "close",
			icon: <Close />,
			onClick: () => close(),
		},
	];

	return (
		<header
			className={cn("relative flex h-(--title-bar-height) w-screen", className)}
			data-tauri-drag-region
		>
			<div className="flex-1 pointer-events-none" />
			<div className="flex-1 ml-2 pointer-events-none flex items-center">
				<img className="size-4 mr-2" src="/app-icon.png" alt="App Icon" />
				<p>noted.</p>
			</div>
			<fieldset className="ml-auto flex">
				{buttons.map((button) => (
					<CaptionButton
						key={button.key}
						identifier={button.key}
						icon={button.icon}
						onClick={button.onClick}
					/>
				))}
			</fieldset>
		</header>
	);
}

function CaptionButton({
	icon,
	identifier,
	className,
	...rest
}: {
	icon: React.ReactNode;
	identifier?: string;
	className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			type="button"
			className={cn(
				"flex h-(--title-bar-height) w-[46px] cursor-default items-center justify-center transition-colors duration-100",
				"bg-caption-button hover:bg-caption-button-hover active:bg-caption-button-active",
				{
					"hover:bg-caption-button-close-hover active:bg-caption-button-close-active":
						identifier === "close",
				},
				className,
			)}
			{...rest}
		>
			<span className="font-[300] font-segoe-fluent-icons text-[10px] text-foreground">
				{icon}
			</span>
		</button>
	);
}
