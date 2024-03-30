import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  paymentMethod: string;
  setPaymentMethod: (data: string) => void;
};

const StepThree = ({ setPaymentMethod, paymentMethod }: Props) => {
  return (
    <Stack gap={2}>
      <Typography textAlign={"center"}>
        Please select the payment method
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Payment method</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="paymentMethod"
          label="Payment method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <MenuItem value={"creditCard"}>Credit Card</MenuItem>
          <MenuItem value={"paypal"}>Pay Pal</MenuItem>
          <MenuItem value={"bankTransfer"}>Bank Transfer</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default StepThree;
