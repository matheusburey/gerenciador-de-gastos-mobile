import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function HomeScreen() {
	const { t } = useTranslation();
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-2xl font-bold">{t("home.title")}</Text>
			<Link href="/(tabs)">dashboard</Link>
			<Link href="/login">login</Link>
		</View>
	);
}
