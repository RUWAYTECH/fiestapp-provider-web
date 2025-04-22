import { Card } from "@mui/material"
import ChangePassword from "./components/change-password"
import ProfileForm from "./components/profile-form"
import ProfilePhoto from "./components/profile-photo"

const Profile = () => {
	return (
		<div>
			<Card sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
				<ProfilePhoto />
			</Card>
			<Card sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
				<ProfileForm />
			</Card>
			<Card sx={{ p: { xs: 2, md: 3 } }}>
				<ChangePassword />
			</Card>
		</div>
	)
}

export default Profile