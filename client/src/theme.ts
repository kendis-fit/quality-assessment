import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            "Roboto",
            "Helvetica",
            "Arial",
            "sans-serif"
        ].join(",")
    }
});

export default theme;