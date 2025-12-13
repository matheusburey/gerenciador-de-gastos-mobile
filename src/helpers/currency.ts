export function formatCurrency(value?: number) {
	if (!value && value !== 0) return "";
	const currency = value / 100;
	const currencyFormatted = currency.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});

	return currencyFormatted;
}
