import {useProductsStore} from "../../store/productsStore";
import {FilterInput} from "./FilterInput";
import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";

describe("FilterInput", () => {
  it("renders with default label", () => {
    render(<FilterInput />);
    expect(screen.getByText("Filter:")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<FilterInput label="Category" />);
    expect(screen.getByText("Category:")).toBeInTheDocument();
  });

  it("renders all expected options", () => {
    render(<FilterInput />);
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    const options = ["All", "Beer", "Wine", "Spirits", "Cider"];
    options.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("calls setProductType when selection changes", () => {
    const spySetProductType = vi.spyOn(useProductsStore.getState(), "setProductType");
    render(<FilterInput />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, {target: {value: "beer"}});

    expect(spySetProductType).toHaveBeenCalledTimes(1);
    expect(spySetProductType).toHaveBeenCalledWith("beer");
  });

  it("displays the selected value correctly", () => {
    render(<FilterInput />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    fireEvent.change(select, {target: {value: "wine"}});
    expect(select.value).toBe("wine");
    fireEvent.change(select, {target: {value: "wine"}});
    expect(select.value).toBe("wine");
  });

  it('displays "All" option with empty value', () => {
    render(<FilterInput />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    fireEvent.change(select, {target: {value: ""}});
    const allOption = screen.getByText("All") as HTMLOptionElement;
    expect(allOption).toBeInTheDocument();
    expect(allOption.value).toBe("");
  });
});
