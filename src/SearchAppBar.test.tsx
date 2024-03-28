import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchAppBar from "./SearchAppBar";

describe("SearchAppBar Component", () => {
  it("should set the search typed by the user", async () => {
    const mockSetSearch = jest.fn();
    const TEXT = "cat";

    render(<SearchAppBar quantity={1} price={1} setSearch={mockSetSearch} />);
    const input = screen.getByLabelText("search");
    await userEvent.type(input, TEXT);

    expect(mockSetSearch).toHaveBeenCalledWith(TEXT);
  });
});
