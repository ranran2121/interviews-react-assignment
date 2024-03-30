import Box from "@mui/material/Box";
import { Cart } from "../../Products";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import { alpha } from "@mui/material/styles";
import { theme } from "../../styles/theme";

const Item = styled(Box)(() => ({
  textAlign: "center",
}));

type Props = {
  cart: Cart | undefined;
};

const StepOne = ({ cart }: Props) => {
  if (!cart) return <></>;

  const { items, totalItems, totalPrice } = cart;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid
          container
          spacing={0}
          sx={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: "5px",
          }}
        >
          <Grid item xs={4}>
            <Item>Name</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>Quantity</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>Price</Item>
          </Grid>
        </Grid>
        {items.map((item, index) => {
          return (
            <Grid
              container
              spacing={0}
              key={item.product.id}
              sx={{
                backgroundColor:
                  index % 2 !== 0 ? alpha(theme.palette.primary.main, 0.2) : "",
                borderRadius: "5px",
              }}
            >
              <Grid item xs={4}>
                <Item>{item.product.name}</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>{item.quantity}</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>$ {item.quantity * item.product.price}</Item>
              </Grid>
            </Grid>
          );
        })}
      </Grid>

      <Grid
        container
        spacing={1}
        sx={{
          fontWeight: "bold",
          fontSize: "1.05rem",
          mt: 2,
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: "5px",
          color: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
        }}
      >
        <Grid item xs={6}>
          <Item>Total items</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>{totalItems}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Total price</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>$ {totalPrice.toFixed(2)}</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepOne;
