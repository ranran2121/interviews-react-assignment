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
  open: boolean;
  setOpen: (value: boolean) => void;
  cart: Cart | undefined;
};

const CartDialog = ({ open, setOpen, cart }: Props) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());

          console.log("FORM", formJson);
          setOpen(false);
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
      {activeStep === 3 && (
        <StepFour setPaymentMethod={setPaymentMethod} setOpen={setOpen} />
      )}
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
