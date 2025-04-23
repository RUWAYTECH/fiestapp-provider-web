export const endpoints = {
    account: {
        menu: '/menu/web/:profileId',
    },
    user: {
        //login: '/auth/local',
        login: '/auth/local',
				googleLogin: '/auth/google/callback?access_token=:token',
				register: '/auth/local/register',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
				changePassword: '/auth/change-password',
        allSelectUser: '/users',
        getUserByeRole: '/users?populate=role&filters[role][type][$eq]=:rolType&filters[name][$contains]=:params',
        allSearchchUser: '/users?filters[$or][0][name][$contains]=:searchParams&filters[$or][1][lastName][$contains]=:searchParams&filters[$or][2][documentIdentification][$contains]=:searchParams&populate=*',
        getUserById: '/users/:idUser?populate=role',
        getUserId: '/users/:id?populate=*',
        addUser: '/users',
        updateUser: '/users/:id',
        deleteUser: '/users/:id',
        getUserRol: '/users-permissions/roles'
    },
		profile: {
				getProfile: '/users/me?populate=*',
				updateProfile: '/users/:id',
				changePassword: '/auth/change-password',
				updateAvatar: '/upload',
		},
		provider: {
			getProviderByUserId: '/providers?filters[user][id][$eq]=:userId',
			updateProvider: '/providers/:id',
			createProvider: '/providers',
			updateProviderProfile: '/providers/custom-create-or-update',
		},
		service: {
			getMyServices: '/services/get-services?pagination[page]=:page&pagination[pageSize]=:pageSize',
			createService: '/services',
			customCreateService: '/services/custom-create',
		},
		category: {
			getCategories: '/categories',
		},
		ubigeo: {
			getUbigeos: '/ubigeos',
		},
		requestService: {
			getRequestMyServices: '/request-services/get-request-service-by-provider?pagination[page]=:page&pagination[pageSize]=:pageSize',
		}
}