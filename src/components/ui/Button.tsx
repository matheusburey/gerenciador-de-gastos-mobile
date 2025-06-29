import {
	Text,
	TouchableOpacity,
	type TouchableOpacityProps,
} from "react-native";

type ButtonProps = TouchableOpacityProps & {
	title: string;
};

export default function Button({ title, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity
			className="bg-purple-500 h-12 w-full rounded-lg items-center justify-center disabled:bg-purple-300"
			activeOpacity={0.8}
			{...rest}
		>
			<Text className="text-white text-lg font-bold">{title}</Text>
		</TouchableOpacity>
	);
}
