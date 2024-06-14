import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Cart } from "../Products";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { theme } from "../styles/theme";
import StepOne from "./CartForm/StepOne";
import StepTwo from "./CartForm/StepTwo";
import StepThree from "./CartForm/StepThree";
import StepFour from "./CartForm/StepFour";
import LinearStepper from "./CartForm/LinearStepper";

type Props = {
  openCartDialog: boolean;
  setOpenCartDialog: (value: boolean) => void;
  cart: Cart | undefined;
  setConfirmation: (value: string) => void;
};

const CartDialog = ({
  openCartDialog,
  setOpenCartDialog,
  setConfirmation,
  cart,
}: Props) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const resetCheckOut = () => {
    setActiveStep(0);
    setAddress("");
    setPaymentMethod("");
    setOpenCartDialog(false);
  };

  return (
    <Dialog
      open={openCartDialog}
      onClose={() => setOpenCartDialog(false)}
      PaperProps={{
        component: "form",
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();

          try {
            const response = await fetch("/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ cart, address, paymentMethod }),
            });

            if (!response.ok) {
              throw new Error("Error");
            }
            setConfirmation("success");
          } catch (e) {
            setConfirmation("fail");
          } finally {
            resetCheckOut();
          }
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }} gap={1}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          Your Cart
        </Typography>
        <ShoppingCartIcon sx={{ color: theme.palette.primary.main }} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>
          We are pleased you chose our products.
        </DialogContentText>
        <DialogContentText sx={{ textAlign: "center" }}>
          Please, fill the form to proceed with the order
        </DialogContentText>
        <Divider sx={{ my: 4 }} />

        {activeStep === 0 && <StepOne cart={cart} />}

        {activeStep === 1 && (
          <StepTwo address={address} setAddress={setAddress} />
        )}

        {activeStep === 2 && (
          <StepThree
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        )}
      </DialogContent>
      {activeStep === 3 && <StepFour resetCheckOut={resetCheckOut} />}

      <Divider sx={{ my: 4 }} />
      <LinearStepper
        paymentMethod={paymentMethod}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        address={address}
      />
    </Dialog>
  );
};

export default CartDialog;
