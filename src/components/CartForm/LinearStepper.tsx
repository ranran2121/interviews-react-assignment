import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = ["Recap", "Add address", "Select payment method", "Confirm"];

type Props = {
  activeStep: number;
  address: string;
  paymentMethod: string;
  setActiveStep: (data: number | ((prevActiveStep: number) => number)) => void;
};

export default function LinearStepper({
  activeStep,
  address,
  paymentMethod,
  setActiveStep,
}: Props) {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleNext = () => {
    if (activeStep === 1 && !address) {
      setIsDisabled(true);
      return;
    }

    if (activeStep === 2 && !paymentMethod) {
      setIsDisabled(true);
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    if (activeStep === 1 && !address) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [activeStep, address]);

  useEffect(() => {
    if (activeStep === 2 && !paymentMethod) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [activeStep, paymentMethod]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={step} {...stepProps}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            {activeStep < steps.length - 1 && (
              <Button onClick={handleNext} disabled={isDisabled}>
                Next
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
