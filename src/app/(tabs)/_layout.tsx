import { Redirect, Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import Icon from "@/components/ui/Icon";
import { useAuth } from "@/hooks/useAuth";

export default function TabLayout() {
	const { isFirstAccess } = useAuth();
	const { t } = useTranslation();

	if (isFirstAccess) {
		return <Redirect href="/presentation" />;
	}

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
					tabBarIcon: ({ color }) => (
						<Icon name="LayoutDashboard" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="transactions/list-transactions"
				options={{
					title: t("menu.transactions"),
					tabBarIcon: ({ color }) => <Icon name="LayoutList" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="transactions/new-transaction"
				options={{
					title: t("menu.transactions"),
					tabBarIcon: ({ color }) => <Icon name="Plus" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: t("menu.settings"),
					tabBarIcon: ({ color }) => <Icon name="Settings" color={color} />,
				}}
			/>
		</Tabs>
	);
}
