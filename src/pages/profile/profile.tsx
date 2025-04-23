import { Card, TextField, Typography } from "@mui/material"
import ChangePassword from "./components/change-password"
import Auth from "@/core/services/auth/auth"

const Profile = () => {
	const userInfo = Auth.getUserInfo()
	console.log(userInfo)
	return (
		<div>
			{/* <Card sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
				<ProfilePhoto />
			</Card>
			<Card sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
				<ProfileForm />
			</Card> */}
			<Card sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
				<Typography variant="h5" component="h1" fontWeight="bold" mb={2}>
					Información de la Cuenta
				</Typography>
				<TextField
					label="Nombre"
					variant="outlined"
					fullWidth
					margin="normal"
					disabled
					value={userInfo?.username || ""}
				/>
				<TextField
					label="Correo Electrónico"
					variant="outlined"
					fullWidth
					margin="normal"
					disabled
					value={userInfo?.email || ""}
				/>
			</Card>
			<Card sx={{ p: { xs: 2, md: 3 } }}>
				<ChangePassword disabled={userInfo.provider === 'google'} />
			</Card>
		</div>
	)
}

export default Profile