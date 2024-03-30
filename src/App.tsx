import createTheme from "@mui/material/styles/createTheme";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SearchAppBar from "./SearchAppBar.tsx";
import { Categories } from "./Categories.tsx";
import { useEffect, useState } from "react";
import { Cart, Products } from "./Products.tsx";
import { ThemeProvider } from "@mui/material/styles";
import CartDialog from "./components/CartDialog.tsx";
import Alert from "@mui/material/Alert";

const theme = createTheme({
  // other theme properties
});

const confirmationMap = {
  success: "Congratulation your order is confirmed",
  fail: "Ops. Something went wrong, please try again later",
};

function App() {
  const [cart, setCart] = useState<Cart | undefined>();
  const [search, setSearch] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [openCartDialog, setOpenCartDialog] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  function onCartChange(cart: Cart) {
    setCart(cart);
  }

  useEffect(() => {
    if (confirmation) {
      setCart(undefined);
      setTimeout(() => {
        setConfirmation("");
      }, 3000);
    }
  }, [confirmation]);

  return (
    <ThemeProvider theme={theme}>
      <Box height="100vh" display="flex" flexDirection="column">
        <CssBaseline />
        <SearchAppBar
          quantity={cart?.totalItems || 0}
          price={cart?.totalPrice || 0}
          setSearch={setSearch}
          setOpenCartDialog={setOpenCartDialog}
          cart={cart}
        />
        {confirmation && (
          <Alert severity={confirmation === "success" ? "success" : "error"}>
            {confirmationMap[confirmation as keyof typeof confirmationMap]}
          </Alert>
        )}
        <Box flex={1} display="flex" flexDirection="row">
          <CartDialog
            openCartDialog={openCartDialog}
            setOpenCartDialog={setOpenCartDialog}
            cart={cart}
            setConfirmation={setConfirmation}
          />
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
