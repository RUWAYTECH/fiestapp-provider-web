export const endpoints = {
	account: {
		menu: '/menu/web/:profileId',
		profile: 'users/profile',
		syncProvider: '/users/sync-provider',
	},
	auth: {
		login: '/auth/signin',
		register: '/auth/signup',
		oauthSignin: '/auth/oauth-signin',
		forgotPassword: '/auth/forgot-password',
		resetPassword: '/auth/reset-password',
		changePassword: '/auth/change-password',
	},
	service: {
		getAll: '/provider-services',
		getById: '/provider-services/:id',
		create: '/provider-services',
		update: '/provider-services/:id',
		delete: '/provider-services/:id',
		changeStatus: '/provider-services/:id/change-status'
	},
	category: {
		getAll: '/categories',
		getById: '/categories/:id',
		create: '/categories',
		update: '/categories/:id',
		delete: '/categories/:id'
	},
	ubigeo: {
		getUbigeos: '/ubigeos',
	},
	requestService: {
		getAll: 'request-services',
		respondToRequest: '/request-services/respond/:id',
	},
	uploadFile: {
		upload: '/upload',
	}
}