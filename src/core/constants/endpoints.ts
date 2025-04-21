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
        allSelectUser: '/users',
        getUserByeRole: '/users?populate=role&filters[role][type][$eq]=:rolType&filters[name][$contains]=:params',
        allSearchchUser: '/users?filters[$or][0][name][$contains]=:searchParams&filters[$or][1][lastName][$contains]=:searchParams&filters[$or][2][documentIdentification][$contains]=:searchParams&populate=*',
        getUserById: '/users/:idUser?populate=role',
        getUserId: '/users/:id?populate=*',
        addUser: '/users',
        updateUser: '/users/:id',
        deleteUser: '/users/:id',
        getUserRol: '/users-permissions/roles'
    }
}