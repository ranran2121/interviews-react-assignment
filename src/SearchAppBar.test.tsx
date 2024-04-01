import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchAppBar from "./SearchAppBar";

describe("SearchAppBar Component", () => {
  it("should set the search typed by the user", async () => {
    const mockSetSearch = jest.fn();
    const TEXT = "cat";

    render(
      <SearchAppBar
        quantity={1}
        price={1}
        setSearch={mockSetSearch}
        setOpenCartDialog={() => {}}
      />
    );
    const input = screen.getByLabelText("search");
    await userEvent.type(input, TEXT);

    expect(mockSetSearch).toHaveBeenCalledWith(TEXT);
  });

  it("should open the CartDialog if the cart is not empty", async () => {
    const mockOpenCartDialog = jest.fn();

    render(
      <SearchAppBar
        quantity={6}
        price={66}
        setSearch={() => {}}
        setOpenCartDialog={mockOpenCartDialog}
      />
    );
    const input = screen.getByLabelText("cart");
    await userEvent.click(input);

    expect(mockOpenCartDialog).toHaveBeenCalled();
  });

  it("should not open the CartDialog if the cart is empty", async () => {
    const mockOpenCartDialog = jest.fn();

    render(
      <SearchAppBar
        quantity={0}
        price={0}
        setSearch={() => {}}
        setOpenCartDialog={mockOpenCartDialog}
      />
    );
    const input = screen.getByLabelText("cart");
    await userEvent.click(input);

    expect(mockOpenCartDialog).not.toHaveBeenCalled();
  });

  it("should display the total amount in the cart", async () => {
    const QUANTITY = 7;
    const PRICE = 6.66;

    render(
      <SearchAppBar
        quantity={QUANTITY}
        price={PRICE}
        setSearch={() => {}}
        setOpenCartDialog={() => {}}
      />
    );

    const totalItems = screen.getByText(QUANTITY);
    expect(totalItems).toBeInTheDocument();
    const totalPrice = screen.getByText(`$ ${PRICE}`);
    expect(totalPrice).toBeInTheDocument();
  });
});
