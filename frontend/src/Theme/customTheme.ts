import { createTheme } from "@mui/material";

const customTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#3652F6",
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