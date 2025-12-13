import { useContext } from "react";

import { DataContext } from "@/contexts/dataContext";

export function useData() {
	return useContext(DataContext);
}
