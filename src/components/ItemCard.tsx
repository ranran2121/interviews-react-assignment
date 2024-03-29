import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { HeavyComponent } from "../HeavyComponent.tsx";
import { Cart, Product } from "../Products.tsx";
import { memo, useEffect, useState } from "react";

type Props = {
  product: Product;
  onCartChange: (cart: Cart) => void;
  setError: (data: boolean) => void;
  cart: Cart | undefined;
};

const ItemCard = memo(({ product, onCartChange, setError, cart }: Props) => {
  const [currentProduct, setCurrentProduct] = useState(product);

  async function addToCart(productId: number, quantity: number) {
    setCurrentProduct({
      ...product,
      loading: true,
    });

    try {
      const response = await fetch("/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const cart = await response.json();

      setCurrentProduct({
        ...product,
        itemInCart: (currentProduct.itemInCart || 0) + quantity,
        loading: false,
      });

      onCartChange(cart);
    } catch (err) {
      setCurrentProduct({
        ...product,
        itemInCart: currentProduct.itemInCart || 0,
        loading: false,
      });
      setError(true);
    }
  }

  useEffect(() => {
    if (cart) {
      const productInCart = cart.items.find(
        (item) => item.product.id === product.id
      );

      if (productInCart) {
        setCurrentProduct({
          ...product,
          itemInCart: productInCart?.quantity,
        });
      }
    }
  }, [cart, product, product.id]);

  return (
    <Grid item xs={4}>
      {/* Do not remove this */}
      <HeavyComponent />
      <Card key={currentProduct.id} style={{ width: "100%" }}>
        <CardMedia
          component="img"
          height="150"
          image={currentProduct.imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {currentProduct.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="h6" component="div">
            ${currentProduct.price}
          </Typography>
          <Box flexGrow={1} />
          <Box
            position="relative"
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Box
              position="absolute"
              left={0}
              right={0}
              top={0}
              bottom={0}
              textAlign="center"
            >
              {currentProduct.loading && <CircularProgress size={20} />}
            </Box>
            <IconButton
              disabled={currentProduct.loading}
              aria-label="delete"
              size="small"
              onClick={() => addToCart(currentProduct.id, -1)}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography
              variant="body1"
              component="div"
              mx={1}
              data-testid={`${currentProduct.id}-quantity`}
            >
              {currentProduct.itemInCart || 0}
            </Typography>

            <IconButton
              disabled={currentProduct.loading}
              aria-label="add"
              size="small"
              onClick={() => addToCart(currentProduct.id, 1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
});

export default ItemCard;
