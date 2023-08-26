import {Router} from './routes/Routers'
import {createTheme, ThemeProvider} from "@mui/material";
import {SnackbarProvider} from 'notistack'
import {store} from "./redux/store";
import {Provider} from "react-redux";

const darkTheme = createTheme({
    palette: {
        primary: {
            light: "#8b28ea",
            main: "#7C26CC",
            dark: "#6d21b0"
        },
        secondary: {
            light: "#fd5e27",
            main: "#FB4F13",
            dark: "#ef490f"
        }
    },
    customColors: {
        primaryBackgroundLight: "#EBE3FC"
    }
})

const lightTheme = createTheme({
    palette: {
        secondary: {
            light: "#8b28ea",
            main: "#7C26CC",
            dark: "#6d21b0"
        },
        primary: {
            light: "#fd5e27",
            main: "#FB4F13",
            dark: "#ef490f"
        }
    },
    customColors: {
        primaryBackgroundLight: "#EBE3FC"
    }
})

function App() {

    return (
        <SnackbarProvider
            autoHideDuration={3000}
            preventDuplicate={true}
            anchorOrigin={{horizontal: "right", vertical: "top"}}
        >
            <Provider store={store}>
                <ThemeProvider theme={darkTheme}>
                    <Router/>
                </ThemeProvider>
            </Provider>
        </SnackbarProvider>
    )
}

export default App
