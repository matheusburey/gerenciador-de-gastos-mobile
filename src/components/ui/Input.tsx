import { TextInput, type TextInputProps } from "react-native";
import { cn } from "@/lib/utils";

interface InputProps extends TextInputProps {
	editable?: boolean;
}

export default function Input({
	className,
	placeholderClassName,
	...props
}: InputProps) {
	return (
		<TextInput
			className={cn(
				"h-10 native:h-12 rounded-md border border-input bg-white px-3",
				"text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground",
				"placeholder:text-muted-foreground file:border-0 file:bg-transparent",
				"file:font-medium w-full",
				!!props.editable && "opacity-50",
				className,
			)}
			placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
			{...props}
		/>
	);
}
