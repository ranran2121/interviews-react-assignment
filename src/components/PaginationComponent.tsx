import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material";

type Props = {
  numberPages: number;
  limit: number;
  page: number;
  handlePaginationChange: (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => void;
  handleLimitChange: (event: SelectChangeEvent<number>) => void;
};

const PaginationComponent = ({
  numberPages,
  limit,
  page,
  handleLimitChange,
  handlePaginationChange,
}: Props) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent={{ md: "space-between" }}
      alignItems={{ xs: "center" }}
      sx={{ my: 4 }}
      gap={2}
      pr={2}
    >
      <Pagination
        count={numberPages}
        color="primary"
        onChange={handlePaginationChange}
        page={page + 1}
      />
      <FormControl sx={{ minWidth: "100px" }}>
        <InputLabel id="number-of-items-label">Items/Page</InputLabel>
        <Select
          labelId="number-of-items-label"
          id="number-of-items-select"
          value={limit}
          label="Number of Items"
          onChange={handleLimitChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default PaginationComponent;
