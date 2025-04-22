import { Avatar, Box, Button, styled, Typography } from "@mui/material"
import { useState } from "react"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

const ProfilePhoto = () => {
	const [profileImage, setProfileImage] = useState<string | null>(null)

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				setProfileImage(e.target?.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<Box sx={{ mb: 4 }}>
			<Typography variant="subtitle1" gutterBottom>
				Foto de Perfil
			</Typography>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
				<Avatar src={profileImage || ""} sx={{ width: 100, height: 100 }}>
					{!profileImage && <PhotoCameraIcon />}
				</Avatar>
				<Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
					Subir imagen
					<VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageUpload} />
				</Button>
			</Box>
		</Box>
	)
}

export default ProfilePhoto