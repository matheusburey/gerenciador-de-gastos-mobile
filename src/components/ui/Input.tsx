import { cn } from "@/lib/utils";
import { TextInput, type TextInputProps } from "react-native";

export default function Input({
	className,
	placeholderClassName,
	editable,
	...props
}: TextInputProps) {
	return (
		<TextInput
			className={cn(
				"h-14 rounded-md border px-3 text-lg font-bold focus:border-purple-600",
				editable === false
					? "border-purple-300 bg-gray-300"
					: "bg-white border-transparent text-purple-800",
				className,
			)}
			editable={editable}
			placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
			{...props}
		/>
	);
}
