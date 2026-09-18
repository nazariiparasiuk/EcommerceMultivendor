import { createTheme } from "@mui/material";

const customTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#4F46E5",
        },
        secondary: {
            main: "#EBEDF1"
        }
    },
    typography: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
    }
})

export default customTheme;