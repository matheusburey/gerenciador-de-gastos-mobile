interface IUser {
	id: number;
	username: string;
	email: string;
	profileImage: string;
}

interface IRegisterUserParams {
	name: string;
	email: string;
	password: string;
}

interface IResponseLoginData {
	access_token: string;
	refresh_token: string;
}

interface ILoginParams {
	email: string;
	password: string;
}

interface IUserWithToken {
	token: string;
	user: IUser;
}
