import { User } from "../user/userDto";

export interface LoginWithEmailDto {
	identifier: string;
	password: string;
}

export interface LoginWithGoogleDto {
	credential: string;
}

export interface LoginResponseDto {
	user: User
	jwt: string
}