import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function ExpensesScreen() {
	const { t } = useTranslation();
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-2xl font-bold">{t("expenses.title")}</Text>
		</View>
	);
}
