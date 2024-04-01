import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type Props = {
  address: string;
  setAddress: (value: string) => void;
};

const StepTwo = ({ address, setAddress }: Props) => {
  return (
    <Stack textAlign={"center"}>
      <Typography>Please add your address</Typography>
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="address"
        label="Delivery Address"
        type="text"
        fullWidth
        variant="outlined"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />
    </Stack>
  );
};

export default StepTwo;
