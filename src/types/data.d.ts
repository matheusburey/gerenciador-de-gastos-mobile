interface ICategory {
	id: string;
	icon: string;
	name: string;
	color: string;
}

interface ITransaction {
	id: string;
	type: "income" | "expense";
	amount: number;
	date: string;
	description?: string;
	category: ICategory;
}

interface ISummary {
	totalBalance: number;
	totalIncome: number;
	totalExpenses: number;
	totalCredit: number;
}

interface ITransactionTypeData {
	categoryId: string;
	categoryName: string;
	categoryColor: string;
	amount: number;
}

interface IBankAccount {
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

interface ITransactionsType {
	income: ITransactionTypeData[];
	expense: ITransactionTypeData[];
}

interface IDashboard {
	accounts: IBankAccount[];
	summary: ISummary;
	recentTransactions: ITransaction[];
	transactionsType: ITransactionsType;
}
