import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

export default function Container({ children }: ContainerProps) {
	return (
		<View className="bg-white flex-1">
			<SafeAreaView>{children}</SafeAreaView>
		</View>
	);
}
