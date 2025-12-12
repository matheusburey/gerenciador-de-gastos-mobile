import { TextInput, type TextInputProps } from "react-native";
import { cn } from "@/lib/utils";

export default function Input({
	className,
	editable,
	...props
}: TextInputProps) {
	return (
		<TextInput
			className={cn(
				"h-14 rounded-md border text-lg focus:border-blue-600",
				editable
					? "border-gray-500 bg-gray-300"
					: "bg-white border-transparent text-gray-800",
				className,
			)}
			editable={editable}
			{...props}
		/>
	);
}
