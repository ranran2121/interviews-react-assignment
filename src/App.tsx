import createTheme from "@mui/material/styles/createTheme";
import { Box, CssBaseline } from "@mui/material";
import SearchAppBar from "./SearchAppBar.tsx";
import { Categories } from "./Categories.tsx";
import { useState } from "react";
import { Cart, Products } from "./Products.tsx";
import { ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  // other theme properties
});

function App() {
  const [cart, setCart] = useState<Cart>();
  const [search, setSearch] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  function onCartChange(cart: Cart) {
    setCart(cart);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box height="100vh" display="flex" flexDirection="column">
        <CssBaseline />
        <SearchAppBar
          quantity={cart?.totalItems || 0}
          price={cart?.totalPrice || 0}
          setSearch={setSearch}
        />
        <Box flex={1} display="flex" flexDirection="row">
          <Categories setCategory={setCategory} />
          <Box flex={1}>
            <Products
              onCartChange={onCartChange}
              search={search}
              category={category}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
