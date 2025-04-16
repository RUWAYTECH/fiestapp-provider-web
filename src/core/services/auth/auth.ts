import userConstants from "../../constants/userConstants"

const getAccount = () => {
    const userData = Auth.getUserData()
    if (userData) {
        return userData
    }
    return null
}

const getUserData = () => {
    const data = Auth.getUserData();
    if (data)
        return data;
    return null;
};

const getUserToken = () => {
    const token = localStorage.getItem(userConstants.USER_TOKEN)
    if (token)
        return token;
    return null;
};

const Auth = {
    isAuthenticated() {
        return getUserData() !== null
    },
    getToken: () => {
        return getUserToken()
    },    
    getUserData: () => {
        const userData = localStorage.getItem(userConstants.USER_ACCOUNT)
        let jsonUserData
        if (userData) {
            try {
                jsonUserData = JSON.parse(userData)
            } catch (error) {
                return null
            }
            return jsonUserData
        }
        return null
    },
    setUserToken: (userToken: any) => {
        localStorage.setItem(userConstants.USER_TOKEN, userToken)
    },
    getUserInfo: () => {
        const userAccount = getAccount()
        if (userAccount) {
            return userAccount
        }
        return null
    },
    setUserInfo: (userInfo: any) => {
        localStorage.setItem(userConstants.USER_ACCOUNT, JSON.stringify(userInfo))
    },
    getUserName: () => {
        const account = localStorage.getItem(userConstants.USER_ACCOUNT)
        if (account) {
            const { userName } = JSON.parse(account);
            return userName;
        }
        return null
    },
    logout: () => {
        localStorage.removeItem(userConstants.USER_ACCOUNT)
        localStorage.removeItem(userConstants.USER_TOKEN)
    },
   
}
export default Auth;