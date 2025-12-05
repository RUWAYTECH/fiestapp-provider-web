import { User } from "../user/userDto";

export interface LoginWithEmailDto {
	email: string;
	password: string;
}

export interface LoginResponseDto {
	user: User
	token: string
}