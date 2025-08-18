import {FilterInput} from "./FilterInput";
import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";

describe("FilterInput", () => {
  it("renders with default label", () => {
    render(<FilterInput value="" onFilter={() => {}} />);
    expect(screen.getByText("Filter:")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<FilterInput label="Category" value="" onFilter={() => {}} />);
    expect(screen.getByText("Category:")).toBeInTheDocument();
  });

  it("renders all expected options", () => {
    render(<FilterInput value="" onFilter={() => {}} />);
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    const options = ["All", "Beer", "Wine", "Spirits", "Cider"];
    options.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("calls onFilter when selection changes", () => {
    const mockOnFilter = vi.fn();
    render(<FilterInput value="" onFilter={mockOnFilter} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, {target: {value: "beer"}});

    expect(mockOnFilter).toHaveBeenCalledTimes(1);
    expect(mockOnFilter).toHaveBeenCalledWith("beer");
  });

  it("displays the initial value correctly", () => {
    render(<FilterInput value="wine" onFilter={() => {}} />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("wine");
  });

  it('has "All" option with empty value', () => {
    render(<FilterInput value="" onFilter={() => {}} />);
    const allOption = screen.getByText("All") as HTMLOptionElement;
    expect(allOption.value).toBe("");
  });
});
