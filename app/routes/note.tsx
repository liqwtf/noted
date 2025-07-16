import { useId } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function Note() {
	const noteContent = useId();

	return (
		<ScrollArea
			className="grow relative mt-4 pr-3 overflow-hidden *:max-w-full"
			scrollBarClassName="pb-4"
		>
			<textarea
				id={noteContent}
				className="field-sizing-content border-none overflow-x-clip max-w-full outline-none resize-none w-full mb-4"
			/>
		</ScrollArea>
	);
}
