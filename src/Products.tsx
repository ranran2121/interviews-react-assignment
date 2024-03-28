import { useEffect, useState } from "react";
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
  SelectChangeEvent,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { HeavyComponent } from "./HeavyComponent.tsx";
import PaginationComponent from "./components/PaginationComponent.tsx";

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  itemInCart: number;
  loading: boolean;
};

export type Cart = {
  items: Product[];
  totalPrice: number;
  totalItems: number;
};
export const Products = ({
  onCartChange,
}: {
  onCartChange: (cart: Cart) => void;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [numberPages, setNumberPages] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const handlePaginationChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1); //subtract 1 as page is 0-indexed in the BE
  };

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    setLimit(event.target.value as number);
  };

  useEffect(() => {
    fetch(`/products?limit=${limit}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setNumberPages(
          data.products.length > 0 //avoid division by 0
            ? Math.floor(data.total / data.products.length)
            : 0
        );
      });
  }, [limit, page]);

  function addToCart(productId: number, quantity: number) {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            loading: true,
          };
        }
        return product;
      })
    );
    fetch("/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    }).then(async (response) => {
      if (response.ok) {
        const cart = await response.json();
        setProducts(
          products.map((product) => {
            if (product.id === productId) {
              return {
                ...product,
                itemInCart: (product.itemInCart || 0) + quantity,
                loading: false,
              };
            }
            return product;
          })
        );
        onCartChange(cart);
      }
    });
  }

  return (
    <>
      <PaginationComponent
        limit={limit}
        numberPages={numberPages}
        handleLimitChange={handleLimitChange}
        handlePaginationChange={handlePaginationChange}
      />
      <Box overflow="scroll" height="100%">
        <Grid container spacing={2} p={2}>
          {products.map((product) => (
            <Grid item xs={4} key={product.id}>
              {/* Do not remove this */}
              <HeavyComponent />
              <Card key={product.id} style={{ width: "100%" }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={product.imageUrl}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  </Typography>
                </CardContent>
                <CardActions>
                  <Typography variant="h6" component="div">
                    ${product.price}
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
                      {product.loading && <CircularProgress size={20} />}
                    </Box>
                    <IconButton
                      disabled={product.loading}
                      aria-label="delete"
                      size="small"
                      onClick={() => addToCart(product.id, -1)}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>

                    <Typography variant="body1" component="div" mx={1}>
                      {product.itemInCart || 0}
                    </Typography>

                    <IconButton
                      disabled={product.loading}
                      aria-label="add"
                      size="small"
                      onClick={() => addToCart(product.id, 1)}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
