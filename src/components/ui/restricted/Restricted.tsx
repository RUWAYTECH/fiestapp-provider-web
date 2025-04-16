import React, { ReactNode } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useMenu from '../../../core/hooks/useMenu'
import { searchActionStatus } from '@/utils/permissionRules';

interface RestrictedProps {
    children: ReactNode;
    allowedTo: string;
    fallback?: ReactNode;
    showLoading?: boolean;
    [key: string]: any; // To capture any other props
  }

  
const Restricted: React.FC<RestrictedProps> = ({
    allowedTo,
    children,
    fallback = <></>,
    showLoading = false,
  }) => {

  const {data, isLoading} = useMenu()
console.log("restrict:",data,allowedTo);

  const isAllowed = searchActionStatus(data, allowedTo);
  
  if (isLoading && showLoading) {
    return (
      <div data-testid="restricted-spinner">
        <CircularProgress />
      </div>
    )
  }

  if (isAllowed) {
    return <>{children}</>
  }

  return <>{fallback}</>
}

export default Restricted
