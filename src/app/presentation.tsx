import { Image } from "expo-image";
import { Link, router } from "expo-router";
import {
	ChartBarIcon,
	ClockIcon,
	CreditCardIcon,
	DollarSign,
	TrendingUpIcon,
	Users,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";
import {
	FlatList,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";

const features = [
	{
		title: "Acompanhamento em Tempo Real",
		description:
			"Monitore suas finanças em tempo real com gráficos e relatórios detalhados.",
		Icon: ClockIcon,
	},
	{
		title: "Orçamento Personalizado",
		description:
			"Defina orçamentos por categoria e receba alertas quando estiver perto do limite.",
		Icon: ChartBarIcon,
	},
	{
		title: "Controle de Gastos",
		description:
			"Categorize seus gastos e identifique para onde seu dinheiro está indo.",
		Icon: DollarSign,
	},
	{
		title: "Metas Financeiras",
		description: "Estabeleça e acompanhe metas de economia e investimentos.",
		Icon: TrendingUpIcon,
	},
	{
		title: "Cartões e Contas",
		description:
			"Gerencie todos os seus cartões e contas bancárias em um só lugar.",
		Icon: CreditCardIcon,
	},
	{
		title: "Compartilhamento Familiar",
		description:
			"Compartilhe suas finanças com familiares para um melhor planejamento em equipe.",
		Icon: Users,
	},
];

export default function PresentationScreen() {
	const { firstAccessPerformed } = useAuth();
	const { t } = useTranslation();

	return (
		<View className="bg-white flex-1">
			<SafeAreaView>
				<View className="px-4 flex-row items-center mt-2 pb-2 justify-between border-b border-gray-200">
					<Image
						source={require("@/assets/images/logo-full.png")}
						style={{ width: 180, height: 40 }}
						className="text-blue-400 "
					/>
					<Link href="/login">
						<Text className="text-xl p-4 text-gray-600">login</Text>
					</Link>
				</View>
				<ScrollView>
					<View className="px-4 py-8 bg-indigo-50">
						<Text className="text-2xl font-bold">{t("home.title")}</Text>
						<Text className="text-2xl font-bold text-blue-600">
							{t("home.title2")}
						</Text>
						<Text className="mt-4 text-gray-700">
							Gerencie seus gastos, receitas e economias em um só lugar. Tome o
							controle das suas finanças pessoais de forma fácil e intuitiva.
						</Text>

						<TouchableOpacity
							className="mt-6 bg-blue-600 rounded-lg px-4 py-3 items-center shadow-sm"
							onPressOut={() => {
								router.push("/register");
							}}
						>
							<Text className="text-white font-bold text-lg">Cadastrar</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="mt-6 bg-white rounded-lg px-4 py-3 items-center border border-gray-300 shadow-sm"
							onPressOut={firstAccessPerformed}
						>
							<Text className="text-gray-500 font-bold text-lg">
								Começar agora
							</Text>
						</TouchableOpacity>
					</View>

					<View className="py-16 sm:py-24 bg-white">
						<View className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<View className="text-center max-w-3xl mx-auto">
								<Text className="px-3 py-1 mb-4 mx-auto text-sm font-semibold text-indigo-400 rounded-full ">
									Recursos Poderosos
								</Text>
								<Text className="text-3xl font-bold text-gray-900">
									Tudo que você precisa para controlar suas finanças
								</Text>
								<Text className="mt-4 text-lg text-gray-600">
									Nossa plataforma oferece ferramentas poderosas para ajudar
									você a gerenciar seu dinheiro de forma eficiente.
								</Text>
							</View>

							<View className="mt-8">
								<FlatList
									scrollEnabled={false}
									data={features}
									keyExtractor={(item) => item.title}
									renderItem={({ item }) => (
										<View className="bg-white p-6 mt-4 rounded-xl shadow-sm border border-gray-100">
											<View className="items-center justify-center h-12 w-12 rounded-xl bg-indigo-500 mb-4">
												<item.Icon color="#FFF" className="h-6 w-6" />
											</View>
											<Text className="text-lg font-semibold text-gray-900 mb-2">
												{item.title}
											</Text>
											<Text className="text-gray-600">{item.description}</Text>
										</View>
									)}
								/>
							</View>
						</View>
					</View>

					{/* CTA Section */}
					<View className="bg-indigo-600 py-12 px-4 text-center">
						<Text className="text-3xl font-bold text-white text-center">
							Pronto para começar?
						</Text>
						<Text className="text-3xl font-bold text-white text-center">
							Cadastre-se gratuitamente hoje mesmo.
						</Text>
						<Text className="mt-4 text-lg text-indigo-100 max-w-2xl text-center">
							Junte-se a milhares de pessoas que já estão no controle de suas
							finanças.
						</Text>

						<TouchableOpacity
							onPress={() => router.push("/register")}
							className="px-6 mt-6 py-3 bg-white rounded-lg"
						>
							<Text className="text-indigo-700 font-semibold text-base text-center">
								Cadastrar
							</Text>
						</TouchableOpacity>
					</View>

					{/* <!-- Footer --> */}
					<View className="bg-white mb-8">
						<View className="max-w-7xl mx-auto py-12 px-4">
							<View className="justify-between items-center">
								<Image
									source={require("@/assets/images/logo-full.png")}
									style={{ width: 180, height: 40 }}
									className="text-blue-400 "
								/>
								<View className="mt-4 flex-row gap-6 text-gray-400">
									<Link href="/">
										<Text className="text-gray-400 text-sm">Termos</Text>
									</Link>
									<Link href="/">
										<Text className="text-gray-400 text-sm">Privacidade</Text>
									</Link>
									<Link href="/">
										<Text className="text-gray-400 text-sm">Contato</Text>
									</Link>
								</View>
							</View>
							<Text className="mt-8 text-center text-sm text-gray-400">
								&copy; 2023 Gerenciador de Gastos. Todos os direitos reservados.
							</Text>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}
