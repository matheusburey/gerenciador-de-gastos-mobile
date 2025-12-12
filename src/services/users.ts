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

export async function createUser(
	payload: IRegisterUserParams,
): Promise<IUserWithToken> {
	const res = await api.post("/auth/signup", payload);
	return res.data;
}

export async function loginService(
	payload: ILoginParams,
): Promise<IUserWithToken> {
	const res = await api.post("/auth/login", payload);
	return res.data;
}

export async function refreshingToken(
	refreshToken: string,
): Promise<IResponseLoginData> {
	const res = await api.post("/auth/refresh-token", { refreshToken });
	return res.data;
}
