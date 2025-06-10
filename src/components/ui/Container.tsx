import { View } from "lucide-react-native";

interface ContainerProps {
	children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
	return <View className="flex-1 items-center justify-center">{children}</View>;
}
