import React, { ReactNode } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Auth from '@/core/services/auth/auth';
import { UserRole } from '@/stateManagement/models/user/userDto';

interface RestrictedProps {
	children: ReactNode;
	allowedTo: UserRole;
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
	const userInfo = Auth.getUserInfo();

	const isAllowed = userInfo.role === allowedTo;

	if (showLoading) {
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
