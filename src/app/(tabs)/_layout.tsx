import { Tabs } from "expo-router";
import { CreditCard, LayoutDashboard } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

export default function TabLayout() {
	const { t } = useTranslation();
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#7c3aed",
				headerShown: false,
				tabBarStyle: Platform.select({
					ios: { position: "absolute" },
					default: {},
				}),
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: t("menu.dashboard"),
					tabBarIcon: ({ color }) => <LayoutDashboard color={color} />,
				}}
			/>
			<Tabs.Screen
				name="expenses"
				options={{
					title: t("menu.expenses"),
					tabBarIcon: ({ color }) => <CreditCard color={color} />,
				}}
			/>
		</Tabs>
	);
}
