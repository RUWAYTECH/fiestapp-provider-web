import { Avatar, Box, IconButton, Typography, Badge, CircularProgress } from "@mui/material"
import { ImageSearch } from "@mui/icons-material"
import { useRef, useState } from "react"
import Config from "@/core/config/config"
import axios from "axios"
import { dispatchNotifyStackError, dispatchNotifyStackSuccess } from "@/core/services/notistack"

const CLOUDINARY_URL = Config.cloudinaryUrl
const CLOUDINARY_PRESET = Config.cloudinaryPreset

interface ImagePickerProps {
	currentImage?: string | null
	fallbackText?: string
	onImageChange?: (cloudinaryUrl: string) => void
	size?: "sm" | "md" | "lg"
}

const sizeMap = {
	sm: 64,
	md: 100,
	lg: 140,
}

export function ImagePicker({
	currentImage,
	fallbackText = "PC",
	onImageChange,
	size = "md",
}: ImagePickerProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		if (!file.type.startsWith("image/")) {
			setError("Por favor selecciona un archivo de imagen válido")
			return
		}

		if (file.size > 5 * 1024 * 1024) {
			setError("La imagen no debe superar los 5MB")
			return
		}

		if (!CLOUDINARY_URL || !CLOUDINARY_PRESET) return

		setError(null)
		setIsUploading(true)

		const formData = new FormData()

		formData.append("file", file)
		formData.append("upload_preset", CLOUDINARY_PRESET)

		axios({
			url: CLOUDINARY_URL,
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			data: formData
		})
			.then(res => {
				setIsUploading(false);
				onImageChange?.(res.data.secure_url);
				if (fileInputRef.current) {
					fileInputRef.current.value = ''; // Reset file input
				}
				dispatchNotifyStackSuccess('Imagen subida correctamente');
			})
			.catch(err => {
				setIsUploading(false);
				dispatchNotifyStackError(err.response?.data?.error?.message || err.message);
				if (fileInputRef.current) {
					fileInputRef.current.value = ''; // Reset file input
				}
			});
	}

	const avatarSize = sizeMap[size]

	return (
		<Box display="flex" flexDirection="column" alignItems="center" gap={2}>
			<Badge
				overlap="circular"
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				badgeContent={
					<IconButton
						onClick={() => fileInputRef.current?.click()}
						disabled={isUploading}
						sx={{
							bgcolor: "primary.main",
							color: "white",
							"&:hover": { bgcolor: "primary.dark" },
							"&:disabled": { bgcolor: "grey.400" },
							width: 36,
							height: 36,
							border: "2px solid white",
						}}
						aria-label="Cambiar imagen"
					>
						{isUploading ? <CircularProgress size={18} color="inherit" /> : <ImageSearch fontSize="small" />}
					</IconButton>
				}
			>
				<Avatar
					src={currentImage || ""}
					alt="Imagen de categoría"
					sx={{
						width: avatarSize,
						height: avatarSize,
						fontSize: avatarSize / 3,
						bgcolor: "grey.300",
						color: "grey.700",
						opacity: isUploading ? 0.7 : 1,
					}}
				>
					{fallbackText.substring(0, 2).toUpperCase()}
				</Avatar>
			</Badge>
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleImageChange}
				style={{ display: "none" }}
				aria-label="Subir imagen de perfil"
			/>
			{error ? (
				<Typography variant="body2" color="error">
					{error}
				</Typography>
			) : (
				<Typography variant="body2" color="text.secondary">
					{isUploading ? "Subiendo imagen..." : "Haz click en el ícono para cambiar la imagen"}
				</Typography>
			)}
		</Box>
	)
}
