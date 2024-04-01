import { screen, render } from "@testing-library/react";

import ItemCard from "./ItemCard";

const ITEMCARD = {
  id: 0,
  name: "Apples",
  imageUrl: "",
  price: 0.4,
  category: "Fruit",
  itemInCart: 5,
  loading: false,
};

const CART = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

describe("Item Cart component", () => {
  it("should render the quantity indicated in the cart", () => {
    render(
      <ItemCard
        product={ITEMCARD}
        cart={CART}
        onCartChange={() => {}}
        setError={() => {}}
      />
    );

    const quantityText = screen.getByTestId(`${ITEMCARD.id}-quantity`);
    expect(quantityText).toHaveTextContent(String(ITEMCARD.itemInCart));
  });

  it("should reset the quantity if the cart is empty", () => {
    render(
      <ItemCard
        product={ITEMCARD}
        cart={undefined}
        onCartChange={() => {}}
        setError={() => {}}
      />
    );

    const quantityText = screen.getByTestId(`${ITEMCARD.id}-quantity`);
    expect(quantityText).toHaveTextContent(String(0));
  });
});
