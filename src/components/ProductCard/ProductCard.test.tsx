import {slugify} from "../../utils/slugify";
import {ProductCard} from "./ProductCard";
import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";

describe("ProductCard", () => {
  it("renders name, price and image with correct attributes", () => {
    render(<ProductCard name="Test Product" imageSrc="test.png" price="$9.99" />);

    const img = screen.getByRole("img", {name: "Test Product"}) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.alt).toBe("Test Product");
    expect(img.src).toContain("/assets/test.png");
    // the component always adds the "skeleton" class
    expect(img.classList.contains("skeleton")).toBe(true);

    expect(screen.getByText("$9.99")).toBeInTheDocument();
  });

  it("renders a link to the slugified product page", () => {
    const name = "My Cool Product";
    render(<ProductCard name={name} imageSrc="cool.png" price="$1.00" />);

    const link = screen.getByRole("link") as HTMLAnchorElement;
    const expected = `/products/${slugify(name)}`;
    expect(link).toBeInTheDocument();
    // JSDOM makes href absolute, so check the pathname ending
    expect(link.href.endsWith(expected)).toBe(true);
  });

  it("shows a Sale badge when isSale is true", () => {
    render(<ProductCard name="Discounted Item" imageSrc="sale.png" price="$5.00" isSale />);

    expect(screen.getByText(/sale/i)).toBeInTheDocument();
  });

  it("does not show a Sale badge when isSale is not provided", () => {
    render(<ProductCard name="Regular Item" imageSrc="regular.png" price="$2.00" />);

    expect(screen.queryByText(/sale/i)).toBeNull();
  });
});
