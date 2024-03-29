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

describe("Item Cart component", () => {
  it("should render the quantity indicated in the cart", () => {
    render(
      <ItemCard
        product={ITEMCARD}
        cart={undefined}
        onCartChange={() => {}}
        setError={() => {}}
      />
    );

    const quantityText = screen.getByTestId(`${ITEMCARD.id}-quantity`);
    expect(quantityText).toHaveTextContent(String(ITEMCARD.itemInCart));
  });
});
