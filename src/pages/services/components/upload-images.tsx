import { Paper, useTheme, CircularProgress, IconButton } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import DeleteIcon from '@mui/icons-material/Delete'

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16,
	gap: 8,
} as const

const thumb = (status: string) => ({
	display: 'inline-flex',
	borderRadius: 2,
	border: `2px solid ${status === 'success' ? 'green' : status === 'error' ? 'red' : '#eaeaea'}`,
	width: 100,
	height: 100,
	padding: 2,
	boxSizing: 'border-box' as const,
	position: 'relative'
}) as const

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden'
} as const

const img = {
	display: 'block',
	width: 'auto',
	height: '100%'
} as const

export interface ImageFile {
	id: string | number
	name: string
	url: string
	state: 'loading' | 'success' | 'error'
}

interface UploadImageProps {
	uploadFile: (file: File) => void
	deleteFile: (fileId: string | number) => void
	uploadedFiles: ImageFile[]
}

const UploadImage = ({ uploadFile, deleteFile, uploadedFiles }: UploadImageProps) => {
	const theme = useTheme()

	const { getRootProps, getInputProps } = useDropzone({
		multiple: false,
		accept: {
			'image/*': []
		},
		onDrop: acceptedFiles => {
			uploadFile(acceptedFiles[0])
		}
	})

	const thumbs = uploadedFiles.map(file => (
		<div style={thumb(file.state)} key={file.id}>
			<div style={thumbInner}>
				<img
					src={file.url}
					style={img}
					alt="preview"
				/>
			</div>
			{file.state === 'loading' && (
				<div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<CircularProgress
						size={25}
						style={{ position: 'absolute' }}
					/>
				</div>
			)}
			<IconButton
				aria-label="delete"
				sx={{
					backgroundColor: theme.palette.error.main,
					color: 'white',
					position: 'absolute',
					top: 0,
					right: 2,
					'&:hover': { backgroundColor: theme.palette.error.dark },
					'&:active': { backgroundColor: theme.palette.error.light },
					'&:focus': { backgroundColor: theme.palette.error.light },
					'&:disabled': { backgroundColor: theme.palette.error.dark, color: 'white', opacity: 0.5 }
				}}
				edge="end"
				size='small'
				onClick={() => deleteFile(file.id)}
				disabled={file.state === 'loading'}
			>
				<DeleteIcon fontSize="small" />
			</IconButton>
		</div>
	))

	return (
		<section style={{ marginTop: '20px' }}>
			<Paper
				{...getRootProps({ className: 'dropzone' })}
				sx={{
					backgroundColor: theme.palette.background.paper,
					padding: 2,
					borderRadius: 2,
					border: '1px dashed',
					borderColor: theme.palette.primary.main,
					cursor: 'pointer',
					'&:hover': { backgroundColor: theme.palette.background.default }
				}}
			>
				<input {...getInputProps()} disabled={uploadedFiles.some(file => file.state === 'loading')} />
				<p>Arrastra y suelta algunas imágenes aquí, o haz clic para seleccionar imágenes</p>
			</Paper>
			<aside style={thumbsContainer}>{thumbs}</aside>
		</section>
	)
}

export default UploadImage