import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useState,
} from "react";

interface EditorContextProps {
	isFocused: boolean;
	setIsFocused: Dispatch<SetStateAction<boolean>>;
	cancelUnfocus: boolean;
	setCancelUnfocus: Dispatch<SetStateAction<boolean>>;
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export function EditorProvider({ children }: { children: ReactNode }) {
	const [isFocused, setIsFocused] = useState(false);
	const [cancelUnfocus, setCancelUnfocus] = useState(false);

	return (
		<EditorContext.Provider
			value={{ isFocused, setIsFocused, cancelUnfocus, setCancelUnfocus }}
		>
			{children}
		</EditorContext.Provider>
	);
}

export function useEditor() {
	const context = useContext(EditorContext);

	if (!context) {
		throw new Error("useEditor must be used within a EditorProvider");
	}

	return context;
}
