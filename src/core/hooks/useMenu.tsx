import { useGetAccountMenuQuery } from '@/stateManagement/apiSlices/userApi';
import Icon from '@mui/material/Icon';
import Auth from '../services/auth/auth';


const useMenu = () => {
  const userInfo = Auth.getUserInfo();
  const profileIdUser=userInfo?.data?.profileId;  
  const {
    data,
    isLoading,
    error,
    ...restArgs
  } = useGetAccountMenuQuery({profileId: profileIdUser},{ skip: !profileIdUser });  

  const items = data?.data?.map((item: any) => ({
    ...item,
    iconWeb: <Icon>{item.icon}</Icon>,
    children: item.children?.map((child: any) => ({
      ...child,
      iconWeb: <Icon>{child.icon}</Icon>,
    })),
  })) || [];

  return { isLoading, data: data?.data||[], items, error, ...restArgs };
};

export default useMenu;
