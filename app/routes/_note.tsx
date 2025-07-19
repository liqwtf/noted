import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

const highlight =
	"hover:bg-accent/25 transition-background duration-150 px-2 rounded-md";

export default function Note() {
	const [isFocused, setIsFocused] = useState(false);
	const textArea = useRef<HTMLTextAreaElement | null>(null);

	const [content, setContent] = useState("");
	const [cursorPosition, setCursorPosition] = useState(0);

	useEffect(() => {
		if (isFocused && textArea.current) {
			textArea.current.focus();
			textArea.current.setSelectionRange(cursorPosition, cursorPosition);
		}
	}, [isFocused, cursorPosition]);

	return (
		<ScrollArea
			className="grow relative mt-4 pr-3 overflow-hidden **:max-w-full"
			scrollBarClassName="pb-4"
		>
			{isFocused ? (
				<textarea
					name="note-content"
					ref={textArea}
					className="field-sizing-content mx-2 leading-7 border-none overflow-x-hidden max-w-full outline-none whitespace-pre-wrap resize-none w-full mb-4"
					onBlur={() => setIsFocused(false)}
					value={content}
					onChange={(event) => setContent(event.target.value)}
					spellCheck="false"
				/>
			) : (
				<div
					className={cn(
						"min-h-7 overflow-x-hidden max-w-full *:whitespace-pre-wrap",
						{
							[highlight]: content === "",
						},
					)}
					onClick={(event) => {
						const selection = window.getSelection();
						let index = 0;
						if (selection?.anchorNode) {
							const range = document.createRange();
							range.setStart(event.currentTarget, 0);
							range.setEnd(selection.anchorNode, selection.anchorOffset);
							index = range.toString().length;
						}
						setCursorPosition(index);
						setIsFocused(true);
					}}
				>
					<Markdown
						components={{
							h1(props) {
								const { className, ...rest } = props;
								return (
									<h1
										className={cn(
											"scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
											highlight,
											className,
										)}
										{...rest}
									/>
								);
							},
							h2(props) {
								const { className, ...rest } = props;
								return (
									<h2
										className={cn(
											"scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
											highlight,
											className,
										)}
										{...rest}
									/>
								);
							},
							h3(props) {
								const { className, ...rest } = props;
								return (
									<h3
										className={cn(
											"scroll-m-20 text-2xl font-semibold tracking-tight",
											highlight,
											className,
										)}
										{...rest}
									/>
								);
							},
							h4(props) {
								const { className, ...rest } = props;
								return (
									<h4
										className={cn(
											"scroll-m-20 text-xl font-semibold tracking-tight",
											highlight,
											className,
										)}
										{...rest}
									/>
								);
							},
							p(props) {
								const { className, ...rest } = props;
								return (
									<p
										className={cn("leading-7", highlight, className)}
										{...rest}
									/>
								);
							},
							blockquote(props) {
								const { className, ...rest } = props;
								return (
									<blockquote
										className={cn(
											"mt-6 border-l-2 pl-6 italic",
											highlight,
											className,
										)}
										{...rest}
									/>
								);
							},
							hr(props) {
								const { className, ...rest } = props;
								return (
									<div className={cn("py-3.5", highlight, className)} {...rest}>
										<Separator />
									</div>
								);
							},
						}}
					>
						{content.replace(/\n/g, "gae")}
					</Markdown>
				</div>
			)}
		</ScrollArea>
	);
}
