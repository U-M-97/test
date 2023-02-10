import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";

const users = () => {
  return (
    <ThemeProvider theme={theme}>
        <FullLayout>
            Users
        </FullLayout>
    </ThemeProvider>
  )
}

export default users