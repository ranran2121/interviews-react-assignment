import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";

type Props = {
  resetCheckOut: () => void;
};

const StepFour = ({ resetCheckOut }: Props) => {
  return (
    <Stack textAlign={"center"}>
      <Typography>Do you want to proceed?</Typography>
      <Stack direction="row" justifyContent={"center"}>
        <DialogActions>
          <Button onClick={resetCheckOut} variant="outlined">
            Cancel
          </Button>
          <Button variant="outlined" type="submit">
            Confirm
          </Button>
        </DialogActions>
      </Stack>
    </Stack>
  );
};

export default StepFour;
