import React from "react";

import App from "./App";
import {cleanup, render, screen} from "@testing-library/react";

vi.mock("./App.module.css", () => ({
  default: {
    main_wrapper: "main_wrapper",
    main_content: "main_content",
    header: "header",
    title: "title",
    search_filter: "search_filter",
  },
}));

vi.mock("../SearchInput", () => {
  return {
    SearchInput: (props: {placeholder: string}) =>
      React.createElement("input", {
        "data-testid": "search-input",
        placeholder: props.placeholder,
      }),
  };
});

vi.mock("../FilterInput", () => {
  return {
    FilterInput: () => React.createElement("button", {"data-testid": "filter-input"}, "Filter"),
  };
});

vi.mock("../ProductList", () => {
  return {
    ProductList: () => React.createElement("div", {"data-testid": "product-list"}, "List"),
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("App component", () => {
  test("renders Products title", () => {
    render(<App />);
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  test("renders SearchInput with provided placeholder", () => {
    render(<App />);
    const search = screen.getByTestId("search-input") as HTMLInputElement;
    expect(search).toBeInTheDocument();
    expect(search.placeholder).toBe("Search product name");
  });

  test("renders FilterInput and ProductList", () => {
    render(<App />);
    expect(screen.getByTestId("filter-input")).toBeInTheDocument();
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });
});
