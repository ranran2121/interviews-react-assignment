import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PaginationComponent from "./components/PaginationComponent.tsx";
import ItemCard from "./components/ItemCard.tsx";

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  itemInCart: number;
  loading: boolean;
};

export type CartItemType = {
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItemType[];
  totalPrice: number;
  totalItems: number;
};

export const Products = ({
  onCartChange,
  search,
  category,
  cart,
}: {
  onCartChange: (cart: Cart) => void;
  search: string | null;
  category: string | null;
  cart: Cart | undefined;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [numberPages, setNumberPages] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [error, setError] = useState(false);

  const handlePaginationChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1); //subtract 1 as page is 0-indexed in the BE
  };

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    setLimit(event.target.value as number);
    setPage(0);
  };

  useEffect(() => {
    let url = `/products?limit=${limit}&page=${page}`;
    if (search) {
      url = url + `&q=${search}`;
    }
    if (category) {
      url = url + `&category=${category}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setNumberPages(data.total ? Math.ceil(data.total / limit) : 0);
      });
  }, [category, limit, page, search]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <>
      <PaginationComponent
        limit={limit}
        numberPages={numberPages}
        page={page}
        handleLimitChange={handleLimitChange}
        handlePaginationChange={handlePaginationChange}
      />
      {error && (
        <Alert severity="error">
          Ops. Something went wrong, please try again later
        </Alert>
      )}
      <Box overflow="scroll" height="100%">
        <Grid container spacing={2} p={2}>
          {products.map((product) => (
            <ItemCard
              product={product}
              key={product.id}
              onCartChange={onCartChange}
              setError={setError}
              cart={cart}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
};
