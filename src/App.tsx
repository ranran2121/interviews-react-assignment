import createTheme from "@mui/material/styles/createTheme";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SearchAppBar from "./SearchAppBar.tsx";
import { Categories } from "./Categories.tsx";
import { useState } from "react";
import { Cart, Products } from "./Products.tsx";
import { ThemeProvider } from "@mui/material/styles";
import CartDialog from "./components/CartDialog.tsx";

const theme = createTheme({
  // other theme properties
});

function App() {
  const [cart, setCart] = useState<Cart>();
  const [search, setSearch] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

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
          setOpen={setOpen}
        />
        <Box flex={1} display="flex" flexDirection="row">
          <CartDialog open={open} setOpen={setOpen} cart={cart} />
          <Categories setCategory={setCategory} category={category} />
          <Box flex={1}>
            <Products
              onCartChange={onCartChange}
              search={search}
              category={category}
              cart={cart}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
