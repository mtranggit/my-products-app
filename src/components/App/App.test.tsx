import React from "react";

import App from "./App";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";

vi.mock("../SearchInput", () => {
  return {
    SearchInput: ({
      placeholder,
      term,
      onSearch,
    }: {
      placeholder: string;
      term: string;
      onSearch: (value: string) => void;
    }) =>
      React.createElement("input", {
        "data-testid": "mock-search-input",
        placeholder,
        value: term,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value),
      }),
  };
});

vi.mock("../FilterInput", () => {
  return {
    FilterInput: ({value, onFilter}: {value: string; onFilter: (value: string) => void}) =>
      React.createElement(
        "select",
        {
          "data-testid": "mock-filter-input",
          value,
          onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onFilter(e.target.value),
        },
        React.createElement("option", {value: ""}, "All"),
        React.createElement("option", {value: "electronics"}, "Electronics"),
        React.createElement("option", {value: "books"}, "Books"),
      ),
  };
});

vi.mock("../ProductList", () => {
  return {
    ProductList: ({query, type}: {query: string; type: string}) =>
      React.createElement(
        "div",
        {"data-testid": "mock-product-list", "data-query": query, "data-type": type},
        `mock product list - query:${query} type:${type}`,
      ),
  };
});

describe("App (ProductsApp) unit tests", () => {
  beforeEach(() => {
    // clear DOM between tests
    document.body.innerHTML = "";
  });

  it("renders header and input components with correct placeholder", () => {
    render(<App />);
    // header title
    expect(screen.getByText("Products")).toBeTruthy();

    // search input present with placeholder from App
    const search = screen.getByTestId("mock-search-input") as HTMLInputElement;
    expect(search).toBeTruthy();
    expect(search).toHaveAttribute("placeholder", "Search product name");

    // filter input present
    const filter = screen.getByTestId("mock-filter-input") as HTMLSelectElement;
    expect(filter).toBeTruthy();

    // product list initial props should be empty strings
    const productList = screen.getByTestId("mock-product-list");
    expect(productList).toHaveAttribute("data-query", "");
    expect(productList).toHaveAttribute("data-type", "");
  });

  it("updates ProductList props when search and filter change", async () => {
    render(<App />);

    const search = screen.getByTestId("mock-search-input") as HTMLInputElement;
    const filter = screen.getByTestId("mock-filter-input") as HTMLSelectElement;
    const productList = () => screen.getByTestId("mock-product-list");

    // simulate typing into search input
    fireEvent.change(search, {target: {value: "phone"}});
    expect(productList()).toHaveAttribute("data-query", "phone");

    // simulate selecting a filter option
    fireEvent.change(filter, {target: {value: "electronics"}});
    expect(productList()).toHaveAttribute("data-type", "electronics");

    // change search again
    fireEvent.change(search, {target: {value: "charger"}});
    expect(productList()).toHaveAttribute("data-query", "charger");
    // ensure filter remains
    expect(productList()).toHaveAttribute("data-type", "electronics");
  });
});
