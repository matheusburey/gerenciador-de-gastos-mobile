import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import DonutChart from "@/components/charts/DonutChart";
import SelectDateModal from "@/components/modal/SelectDateModal";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import { formatCurrency } from "@/helpers/currency";
import { useData } from "@/hooks/useData";

export default function DashboardScreen() {
	const { t } = useTranslation();
	const { summary, transactionsType, bankAccounts } = useData();

	const [date, setDate] = useState(new Date());
	const [openModal, setOpenModal] = useState(false);

	const handleChangeYear = (value: number) => {
		setDate(new Date(date.getFullYear() + value, date.getMonth()));
	};

	const handleChangeMonth = (mouth: number) => {
		setDate(new Date(date.getFullYear(), mouth));
	};

	return (
		<Container>
			<ScrollView className="bg-blue-100">
				<View className="bg-white pt-2 pb-8 rounded-b-xl">
					<TouchableOpacity
						className="flex-row gap-2 w-fit px-6 py-2 mx-auto items-center"
						activeOpacity={0.8}
						onPress={() => setOpenModal(true)}
					>
						<Text className="text-center text-2xl font-bold text-gray-800">
							{date.toLocaleString("pt-BR", { month: "long" })}
						</Text>
						<Icon name="ChevronDown" color="#1e2939" />
					</TouchableOpacity>

					<View className="items-center">
						<Text className="text-base my-2">{t("dashboard.total")}</Text>
						<Text className="text-2xl font-bold">
							{formatCurrency(summary.totalBalance)}
						</Text>
					</View>
					<View className="flex-row justify-center gap-8 mt-6">
						<View className="flex-row items-center gap-2">
							<View className="bg-green-500 h-10 w-10 rounded-full justify-center items-center">
								<Icon name="ArrowUp" color="#FFF" />
							</View>
							<View>
								<Text className="text-base">{t("dashboard.income")}</Text>
								<Text className="text-xl font-bold">
									{formatCurrency(summary.totalIncome)}
								</Text>
							</View>
						</View>
						<View className="flex-row items-center gap-2">
							<View className="bg-red-500 h-10 w-10 rounded-full justify-center items-center">
								<Icon name="ArrowDown" color="#FFF" />
							</View>
							<View>
								<Text className="text-base">{t("dashboard.expense")}</Text>
								<Text className="text-xl font-bold">
									{formatCurrency(summary.totalExpenses)}
								</Text>
							</View>
						</View>
					</View>
				</View>
				<View className="bg-white my-6 mx-2 rounded-xl p-4">
					<Text className="text-lg font-bold text-gray-700">
						{t("dashboard.expense")}:
					</Text>
					<DonutChart data={transactionsType.expense} />
				</View>
				<View className="bg-white my-6 mx-2 rounded-xl p-4 gap-4">
					<Text className="text-lg font-bold text-gray-700">
						{t("dashboard.bank")}:
					</Text>
					{bankAccounts.map((e) => (
						<View key={e.id} className="flex-row gap-3">
							<View className="p-4 bg-gray-100 rounded-full">
								<Icon name="Landmark" color={e.color} />
							</View>
							<View>
								<Text className="text-lg font-bold text-gray-700">
									{e.name}
								</Text>
								<Text className="text-base text-gray-700">
									{formatCurrency(e.balance)}
								</Text>
							</View>
						</View>
					))}
				</View>
			</ScrollView>
			<SelectDateModal
				openModal={openModal}
				handleChangeMonth={handleChangeMonth}
				handleChangeYear={handleChangeYear}
				setCloseModal={() => setOpenModal(false)}
			/>
		</Container>
	);
}
