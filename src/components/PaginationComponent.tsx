import React from "react";
import { Pagination } from "@mui/material";

type Props = {
  numberPages: number;
  handlePaginationChange: (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => void;
};

const PaginationComponent = ({
  numberPages,
  handlePaginationChange,
}: Props) => {
  return (
    <Pagination
      count={numberPages}
      color="primary"
      onChange={handlePaginationChange}
    />
  );
};

export default PaginationComponent;
