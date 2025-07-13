import { getCurrentWindow, type Window } from "@tauri-apps/api/window";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

interface TitleBarContextProps {
	minimize: () => void;
	toggleMaximize: () => void;
	close: () => void;
	isMaximized: boolean;
}

const TitleBarContext = createContext<TitleBarContextProps | undefined>(
	undefined,
);

export function TitleBarProvider({ children }: { children: ReactNode }) {
	const [currentWindow, setCurrentWindow] = useState<Window | null>(null);
	const [isMaximized, setIsMaximized] = useState(false);

	useEffect(() => {
		const window = getCurrentWindow();
		setCurrentWindow(window);

		window.isMaximized().then(setIsMaximized);

		const unlistenResize = window.onResized(() => {
			window.isMaximized().then(setIsMaximized);
		});

		return () => {
			unlistenResize.then((fn) => fn());
		};
	}, []);

	function minimize() {
		currentWindow?.minimize();
	}

	function toggleMaximize() {
		currentWindow?.toggleMaximize();
	}

	function close() {
		currentWindow?.close();
	}

	return (
		<TitleBarContext.Provider
			value={{ minimize, toggleMaximize, close, isMaximized }}
		>
			{children}
		</TitleBarContext.Provider>
	);
}

export function useTitleBar() {
	const context = useContext(TitleBarContext);

	if (!context) {
		throw new Error("useTitleBar must be used within a TitleBarProvider");
	}

	return context;
}
