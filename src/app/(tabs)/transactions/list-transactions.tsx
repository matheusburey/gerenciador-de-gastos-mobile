import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Select from "@/components/ui/Select";
import { formatCurrency } from "@/helpers/currency";
import { useData } from "@/hooks/useData";

const TRANSACTION_TYPE = [
	{ label: "Transações", value: "all" },
	{ label: "Despesas", value: "expense" },
	{ label: "Receitas", value: "income" },
];

export default function DashboardScreen() {
	const { t } = useTranslation();
	const { transactions } = useData();

	const [transactionType, setTransactionType] = useState("all");
	const [date, setDate] = useState(new Date());

	const handlePreviousMonth = () => {
		setDate(new Date(date.getFullYear(), date.getMonth() - 1));
	};

	const handleNextMonth = () => {
		setDate(new Date(date.getFullYear(), date.getMonth() + 1));
	};

	return (
		<Container className="bg-blue-500">
			<View className="px-4 mb-8">
				<Select
					options={TRANSACTION_TYPE}
					selectedValue={transactionType}
					onValueChange={setTransactionType}
				/>
				<View className="w-full pt-2 justify-center items-center  flex-row gap-8">
					<TouchableOpacity activeOpacity={0.8} onPress={handlePreviousMonth}>
						<Icon name="ArrowLeft" size={24} color="#fff" />
					</TouchableOpacity>
					<Text className="w-28 text-center text-2xl font-bold text-white">
						{date.toLocaleString("pt-BR", { month: "long" })}
					</Text>
					<TouchableOpacity activeOpacity={0.8} onPress={handleNextMonth}>
						<Icon name="ArrowRight" size={24} color="#fff" />
					</TouchableOpacity>
				</View>
			</View>
			<View className="bg-white px-4 rounded-t-xl h-screen">
				<View className="flex-row justify-around border-b mb-6 border-gray-200">
					<View className="flex-row gap-4 items-center p-4">
						<Icon name="Banknote" color="#4a5565" size={30} />
						<View>
							<Text className="text-gray-600">
								{t("listTransactions.currentBalance")}
							</Text>
							<Text className="text-green-600 font-semibold">RS 4550,00</Text>
						</View>
					</View>
					<View className="flex-row gap-4 items-center p-4">
						<Icon name="Wallet" color="#4a5565" size={25} />
						<View>
							<Text className="text-gray-600">
								{t("listTransactions.monthlyBalance")}
							</Text>
							<Text className="text-green-600 font-semibold">RS 4550,00</Text>
						</View>
					</View>
				</View>
				{transactions.map((e) => (
					<View className="flex-row gap-3 mb-4" key={e.id}>
						<View className="p-4 bg-gray-100 rounded-full">
							<Icon name={e.category.icon} color={e.category.color} />
						</View>
						<View>
							<Text className="text-lg font-bold text-gray-700">
								{e.description}
							</Text>
							<Text className="text-base text-gray-700">
								{e.category.name} |{" "}
								{new Date(e.date).toLocaleString("pt-BR", {
									year: "numeric",
									month: "2-digit",
									day: "2-digit",
								})}
							</Text>
						</View>
						<Text
							className={`ml-auto text-lg font-bold ${e.type === "income" ? "text-green-500" : "text-red-500"}`}
						>
							{formatCurrency(e.amount)}
						</Text>
					</View>
				))}
			</View>
		</Container>
	);
}
