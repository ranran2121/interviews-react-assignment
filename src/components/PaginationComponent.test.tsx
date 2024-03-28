import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PaginationComponent from "./PaginationComponent";

describe("Pagination Component", () => {
  it("should render the indicated number of pages", () => {
    const NUMBERPAGES = 4;
    render(
      <PaginationComponent
        limit={100}
        numberPages={NUMBERPAGES}
        handlePaginationChange={() => {}}
        handleLimitChange={() => {}}
      />
    );

    for (let i = 1; i <= NUMBERPAGES; i++) {
      const button = screen.queryByText(i);
      expect(button).toBeVisible();
    }
  });

  it("should set the clicked page", async () => {
    const NUMBERPAGES = 4;
    const mockHandlePaginationChange = jest.fn();
    const PAGE = "2";
    const regex = new RegExp(PAGE, "i");

    render(
      <PaginationComponent
        limit={100}
        numberPages={NUMBERPAGES}
        handlePaginationChange={mockHandlePaginationChange}
        handleLimitChange={() => {}}
      />
    );

    const paginationButton = screen.getByRole("button", { name: regex });
    await userEvent.click(paginationButton);

    expect(mockHandlePaginationChange).toHaveBeenCalledWith(
      expect.anything(), //it means that we expect the mock function to have been called with any value as the first argument
      Number(PAGE)
    );
  });

  it("should render the selected/default items/page", async () => {
    const LIMIT = 100;
    render(
      <PaginationComponent
        limit={LIMIT}
        numberPages={4}
        handlePaginationChange={() => {}}
        handleLimitChange={() => {}}
      />
    );

    const selectComponent = screen.getByRole("combobox", {
      name: "Items/Page",
    });
    expect(selectComponent).toHaveTextContent(LIMIT.toString());
  });
  it("should set the clicked items/page", async () => {
    const LIMIT = "50";
    const mockhandleLimitChange = jest.fn();
    const regex = new RegExp(LIMIT, "i");

    render(
      <PaginationComponent
        limit={100}
        numberPages={4}
        handlePaginationChange={() => {}}
        handleLimitChange={mockhandleLimitChange}
      />
    );

    const selectComponent = screen.getByRole("combobox", {
      name: "Items/Page",
    });
    await userEvent.click(selectComponent);
    const menuItem = await screen.findByRole("option", { name: regex });
    await userEvent.click(menuItem);

    expect(mockhandleLimitChange.mock.calls[0][1].props.value).toBe(
      Number(LIMIT)
    );
  });
});
