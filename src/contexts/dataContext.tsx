import { createContext, useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getDashboard } from "@/services/dashboard";

interface ITransactionsContext {
	loading: boolean;
	transactions: ITransaction[];
	summary: ISummary;
	transactionsType: ITransactionsType;
	bankAccounts: IBankAccount[];
	addTransaction: (transaction: ITransaction) => void;
}

export const DataContext = createContext({} as ITransactionsContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { token } = useAuth();

	const [loading, setLoading] = useState(false);
	const [summary, setSummary] = useState({} as ISummary);
	const [transactions, setTransaction] = useState<ITransaction[]>([]);
	const [transactionsType, setTransactionsType] = useState(
		{} as ITransactionsType,
	);
	const [bankAccounts, setBankAccounts] = useState<IBankAccount[]>([]);

	function addTransaction(transaction: ITransaction) {
		setTransaction((prev) => [...prev, transaction]);
	}

	const startLoading = useCallback(async () => {
		setLoading(true);
		try {
			const dashboardData = await getDashboard(token);
			setBankAccounts(dashboardData.accounts);
			setSummary(dashboardData.summary);
			setTransaction(dashboardData.recentTransactions);
			setTransactionsType(dashboardData.transactionsType);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}, [token]);

	useEffect(() => {
		if (token) startLoading();
	}, [token, startLoading]);

	return (
		<DataContext.Provider
			value={{
				loading,
				transactions,
				bankAccounts,
				summary,
				transactionsType,
				addTransaction,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
