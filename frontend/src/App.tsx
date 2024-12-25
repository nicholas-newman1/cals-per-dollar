import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import MenuItemSearch from "./pages/MenuItemSearch";
import About from "./pages/About";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<MenuItemSearch />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
