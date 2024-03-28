import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Categories, categories } from "./Categories";

describe("Categories Component", () => {
  it("should highlight the selected category", async () => {
    const SELECTEDCATEGORY = categories[0];
    const regex = new RegExp(SELECTEDCATEGORY, "i");

    render(<Categories category={"Fruit"} setCategory={() => {}} />);
    const selectedCategoryButton = await screen.findByTestId(regex);

    expect(selectedCategoryButton).toHaveStyle(
      "background-color: rgba(25, 118, 210, 1)"
    );
  });

  it("should set the clicked category", async () => {
    const SELECTEDCATEGORY = categories[0];
    const regex = new RegExp(SELECTEDCATEGORY, "i");
    const mocksetCategory = jest.fn();

    render(<Categories category={null} setCategory={mocksetCategory} />);
    const selectedCategoryButton = screen.getByRole("button", {
      name: regex,
    });

    await userEvent.click(selectedCategoryButton);

    expect(mocksetCategory).toHaveBeenCalledWith(SELECTEDCATEGORY);
  });
});
