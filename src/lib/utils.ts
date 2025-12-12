import { twMerge } from "tailwind-merge";

export function cn(...inputs: Array<string | undefined>) {
	return twMerge(inputs);
}
