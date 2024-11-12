import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import RestaurantSearch from "./pages/RestaurantSearch";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant/Restaurant";
import MenuItemSearch from "./pages/MenuItemSearch";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<RestaurantSearch />} />
          <Route path="/restaurants/:id" element={<Restaurant />} />
          <Route path="/food" element={<MenuItemSearch />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
