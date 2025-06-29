interface IUser {
	id: number;
	username: string;
	email: string;
	password: string;
	phone: string;
}

interface IRegisterUserParams {
	name: string;
	email: string;
	password: string;
	phone: string;
}

interface IResponseLoginData {
	access_token: string;
	refresh_token: string;
}

interface ILoginParams {
	email: string;
	password: string;
}
