import Auth from "../services/auth/auth"

const useProfile = () => {
  const userInfo = Auth.getUserInfo()  
  return { userCode: userInfo.data.userName, profileCode: userInfo.data.profileId}
}

export default useProfile;
