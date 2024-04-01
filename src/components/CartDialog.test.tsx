import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CartDialog from "./CartDialog";

const CART = {
  items: [
    {
      product: {
        id: 0,
        name: "Apples",
        imageUrl: "",
        price: 1.55,
        category: "Fruit",
        itemInCart: 2,
        loading: false,
      },
      quantity: 7,
    },
  ],
  totalItems: 44,
  totalPrice: 10.55,
};

const clickNextButton = async () => {
  const nextButton = screen.getByRole("button", { name: "Next" });
  await userEvent.click(nextButton);
};

const fillStep2 = async () => {
  const addressInput = screen.getByRole("textbox", {
    name: "Delivery Address",
  });
  await userEvent.type(addressInput, "address");
};

const fillStep3 = async () => {
  const paymentMethodInput = screen.getByRole("combobox", {
    name: "Payment method",
  });

  await userEvent.click(paymentMethodInput);
  await userEvent.click(screen.getByRole("option", { name: "Credit Card" }));
};

describe("Cart Dialog Component", () => {
  it("should show the cart details on step one", async () => {
    render(
      <CartDialog
        openCartDialog={true}
        cart={CART}
        setOpenCartDialog={() => {}}
        setConfirmation={() => {}}
      />
    );

    for (const item of CART.items) {
      const itemName = screen.getByText(item.product.name);
      expect(itemName).toBeInTheDocument();
      const itemQuantity = screen.getByText(String(item.quantity));
      expect(itemQuantity).toBeInTheDocument();
      const ITEMTOTAL = item.product.price * item.quantity;
      const itemPrice = screen.getByText(`$ ${ITEMTOTAL}`);
      expect(itemPrice).toBeInTheDocument();
    }
  });

  it("should show the delivery address input field on step two and next button to be disabled", async () => {
    render(
      <CartDialog
        openCartDialog={true}
        cart={CART}
        setOpenCartDialog={() => {}}
        setConfirmation={() => {}}
      />
    );

    await clickNextButton();

    const addressInput = screen.getByRole("textbox", {
      name: "Delivery Address",
    });

    expect(addressInput).toBeInTheDocument();

    const nextButton = screen.getByRole("button", { name: "Next" });

    expect(nextButton).toBeDisabled();
  });

  it("should show the payment method select field on step three and next button to be disabled", async () => {
    render(
      <CartDialog
        openCartDialog={true}
        cart={CART}
        setOpenCartDialog={() => {}}
        setConfirmation={() => {}}
      />
    );

    await clickNextButton();

    await fillStep2();

    await clickNextButton();

    const paymentMethodInput = screen.getByRole("combobox", {
      name: "Payment method",
    });

    expect(paymentMethodInput).toBeInTheDocument();

    const nextButton = screen.getByRole("button", { name: "Next" });

    expect(nextButton).toBeDisabled();
  });

  it("should show the confirmation and cancel buttons on step four", async () => {
    render(
      <CartDialog
        openCartDialog={true}
        cart={CART}
        setOpenCartDialog={() => {}}
        setConfirmation={() => {}}
      />
    );

    await clickNextButton();

    await fillStep2();

    await clickNextButton();

    await fillStep3();

    await clickNextButton();

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    expect(confirmButton).toBeInTheDocument();
  });
});
