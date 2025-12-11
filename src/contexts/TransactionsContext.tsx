// src/contexts/TransactionsContext.tsx
import type React from "react";
import { createContext, useContext, useState } from "react";

interface ITransaction {
	id: string;
	type: "income" | "expense";
	amount: number;
	category: string;
	date: string;
	description?: string;
}

interface ITransactionsContext {
	state: ITransaction[];
	addTransaction: (transaction: ITransaction) => void;
}

const TransactionsContext = createContext({} as ITransactionsContext);

export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, setState] = useState<ITransaction[]>([]);

	function addTransaction(transaction: ITransaction) {
		setState((prev) => [...prev, transaction]);
	}

	return (
		<TransactionsContext.Provider value={{ state, addTransaction }}>
			{children}
		</TransactionsContext.Provider>
	);
};

export const useTransactions = () => useContext(TransactionsContext);
