import { Box, BoxProps, Typography } from '@mui/material';

interface ContainerProps {
	title: React.ReactElement | string;
	children?: React.ReactNode;
	sx?: BoxProps['sx'];
}

export default function Container({ title, children, sx }: ContainerProps) {
	return (
		<Box sx={sx}>
			{typeof title === 'string' ? (
				<Typography variant="h5" gutterBottom>
					{title}
				</Typography>
			) : (
				title
			)}
			{children}
		</Box>
	);
}
