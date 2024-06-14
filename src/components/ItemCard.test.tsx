import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({ items: [{ product: ITEMCARD, quantity: 1 }] }),
  })
) as jest.Mock;

describe("Item Cart component", () => {
  beforeAll(() => {
    global.fetch = mockFetch;
  });
  afterEach(() => {
    mockFetch.mockClear();
  });

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

  it("should increase the quantity if the add button is clicked", async () => {
    render(
      <ItemCard
        product={ITEMCARD}
        cart={CART}
        onCartChange={() => {}}
        setError={() => {}}
      />
    );

    const quantityText = screen.getByTestId(`${ITEMCARD.id}-quantity`);
    expect(quantityText).toHaveTextContent(String(5));

    const addButton = screen.getByLabelText("add");
    await userEvent.click(addButton);
    await userEvent.click(addButton);
    await waitFor(() => expect(quantityText).toHaveTextContent(String(7)));
  });

  it("should decrease the quantity if the remove button is clicked", async () => {
    render(
      <ItemCard
        product={ITEMCARD}
        cart={CART}
        onCartChange={() => {}}
        setError={() => {}}
      />
    );

    const quantityText = screen.getByTestId(`${ITEMCARD.id}-quantity`);
    expect(quantityText).toHaveTextContent(String(5));

    const removeButton = screen.getByLabelText("delete");
    await userEvent.click(removeButton);
    await userEvent.click(removeButton);
    await waitFor(() => expect(quantityText).toHaveTextContent(String(3)));
  });

  it("should not decrease the quantity below zero if the remove button is clicked", async () => {
    render(
      <ItemCard
        product={ITEMCARD}
        cart={CART}
        onCartChange={() => {}}
        setError={() => {}}
      />
    );

    const quantityText = screen.getByTestId(`${ITEMCARD.id}-quantity`);
    expect(quantityText).toHaveTextContent(String(5));

    const removeButton = screen.getByLabelText("delete");
    for (let i = 0; i <= ITEMCARD.itemInCart + 1; i++) {
      await userEvent.click(removeButton);
    }

    await waitFor(() => expect(quantityText).toHaveTextContent(String(0)));
  });
});
