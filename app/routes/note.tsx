import { useEffect, useRef, useState } from "react";
import { Card } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn, formatString } from "~/lib/utils";

type EditableField = {
	value: string;
	onChange: (value: string) => void;
	isEditing: boolean;
	onActivate: () => void;
	placeholder?: string;
};

export default function Note() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [activeEditor, setActiveEditor] = useState<"title" | "content" | null>(
		null,
	);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		if (!containerRef.current?.contains(e.relatedTarget as Node)) {
			setActiveEditor(null);
			setTitle((prev) => formatString(prev));
			setContent((prev) => formatString(prev));
		}
	};

	return (
		<ScrollArea
			className="grow relative mt-4 pr-3 overflow-hidden **:max-w-full"
			scrollBarClassName="pb-4"
		>
			<div ref={containerRef} onBlur={handleBlur} className="flex flex-col">
				<EditableNoteTitle
					value={title}
					onChange={setTitle}
					isEditing={activeEditor === "title"}
					onActivate={() => setActiveEditor("title")}
					placeholder="untitled note"
				/>
				<EditableNoteContent
					value={content}
					onChange={setContent}
					isEditing={activeEditor === "content"}
					onActivate={() => setActiveEditor("content")}
				/>
			</div>
		</ScrollArea>
	);
}

const highlightClasses =
	"hover:bg-accent/25 transition-background duration-150 px-2 rounded-md";

function EditableNoteTitle({
	value,
	onChange,
	isEditing,
	onActivate,
	placeholder,
}: EditableField) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus();
		}
	}, [isEditing]);

	const commonClasses =
		"h-10 text-4xl font-extrabold tracking-tight text-balance";

	return isEditing ? (
		<input
			ref={inputRef}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			spellCheck={false}
			className={cn(
				"w-full resize-none px-2 overflow-hidden border-none bg-transparent outline-none whitespace-pre-wrap",
				commonClasses,
			)}
		/>
	) : (
		<button
			type="button"
			onClick={onActivate}
			className={cn(
				"w-full text-start cursor-text",
				highlightClasses,
				commonClasses,
			)}
		>
			{formatString(value) || (
				<span className="text-muted-foreground/35">{placeholder}</span>
			)}
		</button>
	);
}

function EditableNoteContent({
	value,
	onChange,
	isEditing,
	onActivate,
	placeholder,
}: EditableField) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (isEditing) {
			textareaRef.current?.focus();
		}
	}, [isEditing]);

	return isEditing ? (
		<textarea
			ref={textareaRef}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			spellCheck={false}
			className="field-sizing-content px-2 mb-4 max-w-full w-full resize-none overflow-x-hidden border-none bg-transparent leading-7 outline-none whitespace-pre-wrap"
		/>
	) : (
		<button
			type="button"
			onClick={onActivate}
			className={cn(
				"w-full min-h-7 text-start cursor-text whitespace-pre leading-7",
				highlightClasses,
			)}
		>
			{formatString(value) || (
				<span className="text-muted-foreground/35">{placeholder}</span>
			)}
		</button>
	);
}
