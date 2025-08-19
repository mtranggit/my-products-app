import {act} from "react";

import {useProductsStore} from "../../store/productsStore";
import {SearchInput} from "./SearchInput";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {cleanup, fireEvent, render, screen} from "@testing-library/react";

describe("SearchInput", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders with placeholder and default term", () => {
    // const onSearch = vi.fn();
    render(<SearchInput placeholder="Search..." />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe("");
  });

  it("calls setProductName once after debounce delay with the latest value", () => {
    const spySetProductName = vi.spyOn(useProductsStore.getState(), "setProductName");
    render(<SearchInput placeholder="Search..." />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;

    // single change -> should call after debounce
    fireEvent.change(input, {target: {value: "abc"}});
    expect(spySetProductName).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(spySetProductName).toHaveBeenCalledTimes(1);
    expect(spySetProductName).toHaveBeenCalledWith("abc");
  });

  it("debounces rapid input changes and only calls onSearch for the last value", () => {
    const spySetProductName = vi.spyOn(useProductsStore.getState(), "setProductName");
    render(<SearchInput placeholder="Search..." />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;

    // rapid changes
    fireEvent.change(input, {target: {value: "a"}});
    fireEvent.change(input, {target: {value: "ab"}});
    fireEvent.change(input, {target: {value: "abc"}});

    // still not called immediately
    expect(spySetProductName).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(spySetProductName).toHaveBeenCalledTimes(1);
    expect(spySetProductName).toHaveBeenCalledWith("abc");
  });
});
