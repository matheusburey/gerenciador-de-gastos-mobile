import Input from "@/components/ui/Input";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function LoginScreen() {
	const { t } = useTranslation();
	return (
		<View className="flex-1 bg-gray-200 dark:bg-zinc-800 items-center justify-center">
			<View className="w-full max-w-md px-10 gap-4">
				<Text className="text-2xl dark:text-zinc-200 font-bold">
					{t("login.title")}
				</Text>
				<Input />
				<Input />
			</View>
		</View>
	);
}
