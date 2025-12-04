import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

const createCustomTheme = (mode: "light" | "dark") => {
	return createTheme({
		palette: {
			mode,
			// Concrete color values derived from the provided OKLCH theme
			...(mode === "light"
				? {
					  primary: {
						  light: '#ec003f',
						  main: '#ec003f',
						  dark: '#ec003f',
						  contrastText: '#fff1f2',
					  },
					  // Secondary adjusted for better contrast on controls (light mode)
					  secondary: {
						  light: '#2b3947',
						  main: '#1C2536',
						  dark: '#131925',
						  contrastText: '#ffffff',
					  },
						background: { default: "#ffffff", paper: "#ffffff" },
						text: { primary: "#09090b", secondary: "#71717b" },
						divider: "#e4e4e7",
						error: {
							main: "#e7000b",
							light: red[300],
							dark: red[700],
							contrastText: "#fff",
						},
				  }
				: {
					  primary: {
						  light: '#ff2056',
						  main: '#ff2056',
						  dark: '#ff2056',
						  contrastText: '#fff1f2',
					  },
					  // Secondary adjusted for better contrast on controls (dark mode)
					  secondary: {
						  light: '#3f4a59',
						  main: '#374552',
						  dark: '#2e3740',
						  contrastText: '#fafafa',
					  },
						background: { default: "#09090b", paper: "#18181b" },
						text: { primary: "#fafafa", secondary: "#9f9fa9" },
						divider: "rgba(255,255,255,0.1)",
						error: {
							main: "#ff6467",
							light: red[300],
							dark: red[700],
							contrastText: "#fff",
						},
				  }),
			// Semantic fallbacks
			success: { main: "#ff2056" },
			info: { main: "#ec003f" },
			warning: { main: "#ff637e" },
		},
		breakpoints: {
			values: {
				xl,
				lg,
				md,
				sm,
				xs,
			},
		},
		components: {
			MuiTextField: {
				defaultProps: {
					size: "small",
				},
			},
		},
	});
};

export default createCustomTheme;
