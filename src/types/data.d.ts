import type { IconType } from "@/components/ui/Icon";

export interface ICategory {
	id: string;
	icon: IconType;
	name: string;
	color: string;
}

export interface ITransaction {
	id: string;
	type: "income" | "expense";
	amount: number;
	date: string;
	description?: string;
	category: ICategory;
}

export interface ISummary {
	totalBalance: number;
	totalIncome: number;
	totalExpenses: number;
	totalCredit: number;
}

export interface ITransactionTypeData {
	categoryId: string;
	categoryName: string;
	categoryColor: string;
	amount: number;
}

export interface IBankAccount {
	id: string;
	name: string;
	color: string;
	icon: string;
	balance: number;
	currency: string;
	include_in_budget: true;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

export interface ITransactionsType {
	income: ITransactionTypeData[];
	expense: ITransactionTypeData[];
}

export interface IDashboard {
	accounts: IBankAccount[];
	summary: ISummary;
	recentTransactions: ITransaction[];
	transactionsType: ITransactionsType;
}
