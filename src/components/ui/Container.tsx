import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

export default function Container({ children, className }: ContainerProps) {
	return (
		<View className={cn("bg-white flex-1", className)}>
			<SafeAreaView>
				<ScrollView>{children}</ScrollView>
			</SafeAreaView>
		</View>
	);
}
