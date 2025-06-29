import { api } from "@/lib/api";

export async function getProfile(jwt: string): Promise<IUser> {
	const res = await api.get("/auth/profile", {
		headers: { Authorization: `Bearer ${jwt}` },
	});
	return res.data;
}

export async function getUserData(userID: number): Promise<IUser> {
	const res = await api.get(`/users/${userID}`);
	return res.data;
}

export async function createUser(params: IRegisterUserParams): Promise<IUser> {
	const res = await api.post("/users", params);
	return res.data;
}

export async function loginService(params: ILoginParams): Promise<IUser> {
	const res = await api.get("/users", { params });
	return res.data[0];
}

export async function refreshingToken(
	refreshToken: string,
): Promise<IResponseLoginData> {
	const res = await api.post("/auth/refresh-token", { refreshToken });
	return res.data;
}
