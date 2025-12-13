import { api } from "@/lib/api";

export async function getDashboard(jwt: string): Promise<IDashboard> {
	const res = await api.get("/dashboard", {
		headers: { Authorization: `Bearer ${jwt}` },
	});
	return res.data;
}
