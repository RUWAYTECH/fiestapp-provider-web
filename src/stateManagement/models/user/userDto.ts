export interface User {
	id: number
	username: string
	email: string
}

export interface userDto {
    identifier: string;
    password: string;
}

export interface IUserDto {
    rolType: string;
}

export interface emailUserDto {
    email: string;
}

export interface resetPasswordDto {
    password: string;
    passwordConfirmation: string;
    code: string;
}