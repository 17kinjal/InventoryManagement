// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#273326', // Customize the primary color
		},
		secondary: {
			main: '#E5FD72', // Customize the secondary color
			light: '#727E39'
		},
		background: {
			default: '#161718', // Set default background color
			paper: '#212124',   // Optionally, you can set Paper background too
		},
		text: {
			primary: '#ffffff', // Set primary text color to white
			secondary: '#ffffff', // Set secondary text color to white as well
			
		},
	},
});

export default theme;
