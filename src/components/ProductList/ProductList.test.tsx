import type {Product} from "../../lib/types";
import {ProductList} from "./ProductList";
import {afterEach, describe, expect, it, vi} from "vitest";
import {cleanup, render, screen} from "@testing-library/react";

const mockUseFetchFilteredProduct = vi.fn();

vi.mock("../../hooks", () => ({
  useFetchFilteredProduct: (...args: Product[]) => mockUseFetchFilteredProduct(...args),
}));

vi.mock("../ProductCard", () => ({
  ProductCard: ({name, price}: {name: string; price: string}) => (
    <div data-testid="product-card">
      {name} - {price}
    </div>
  ),
}));

vi.mock("../Skeletons", () => ({
  ProductListSkeleton: () => <div data-testid="product-list-skeleton">Skeleton</div>,
}));

afterEach(() => {
  mockUseFetchFilteredProduct.mockReset();
  cleanup();
});

describe("ProductList", () => {
  it("renders skeleton while loading", () => {
    mockUseFetchFilteredProduct.mockReturnValue({
      data: [],
      isPending: true,
      error: null,
    });

    render(<ProductList />);
    expect(screen.getByTestId("skeleton-loading")).toBeDefined();
    expect(screen.getByTestId("product-list-skeleton")).toBeDefined();
  });

  it("renders error message when hook returns error", () => {
    mockUseFetchFilteredProduct.mockReturnValue({
      data: [],
      isPending: false,
      error: "Network error",
    });

    render(<ProductList />);
    expect(screen.getByTestId("error").textContent).toContain("Something went wrong: Network error");
  });

  it("renders product cards when products are returned", () => {
    mockUseFetchFilteredProduct.mockReturnValue({
      data: [
        {
          index: 1,
          productName: "Prod A",
          productImage: "a.jpg",
          isSale: true,
          price: 9.99,
        },
        {
          index: 2,
          productName: "Prod B",
          productImage: "b.jpg",
          isSale: false,
          price: 19.99,
        },
      ],
      isPending: false,
      error: null,
    });

    render(<ProductList />);
    const cards = screen.getAllByTestId("product-card");
    expect(cards).toHaveLength(2);
    expect(cards[0].textContent).toContain("Prod A - 9.99");
    expect(cards[1].textContent).toContain("Prod B - 19.99");
  });

  it("renders 'No products found' when products array is empty", () => {
    mockUseFetchFilteredProduct.mockReturnValue({
      data: [],
      isPending: false,
      error: null,
    });

    render(<ProductList />);
    expect(screen.getByText("No products found")).toBeDefined();
  });
});
