import { Paper, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16
} as const

const thumb = {
	display: 'inline-flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 8,
	marginRight: 8,
	width: 100,
	height: 100,
	padding: 4,
	boxSizing: 'border-box' as const
}

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


const UploadImage = () => {
	const [files, setFiles] = useState<any[]>([])
	const theme = useTheme()

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': []
		},
		onDrop: acceptedFiles => {
			setFiles(acceptedFiles.map(file => Object.assign(file, {
				preview: URL.createObjectURL(file)
			})))
		}
	})

	const thumbs = files.map(file => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img
					src={file.preview}
					style={img}
					// Revoke data uri after image is loaded
					onLoad={() => { URL.revokeObjectURL(file.preview) }}
				/>
			</div>
		</div>
	))

	useEffect(() => {
		// Make sure to revoke the data uris to avoid memory leaks, will run on unmount
		return () => files.forEach(file => URL.revokeObjectURL(file.preview))
	}, [files])

	return (
		<section style={{ marginTop: '20px' }}>
			<Paper {...getRootProps({ className: 'dropzone' })} sx={{ backgroundColor: theme.palette.background.paper, padding: 2, borderRadius: 2, border: '1px dashed', borderColor: theme.palette.primary.main, cursor: 'pointer', '&:hover': { backgroundColor: theme.palette.background.default } }}>
				<input {...getInputProps()} />
				{/* <p>Drag 'n' drop some files here, or click to select files</p> */}
				<p>Arrastra y suelta algunas imágenes aquí, o haz clic para seleccionar imágenes</p>
			</Paper>
			<aside style={thumbsContainer}>
				{thumbs}
			</aside>
		</section>
	)
}

export default UploadImage