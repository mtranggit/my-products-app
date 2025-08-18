import {act} from "react";

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
    const onSearch = vi.fn();
    render(<SearchInput placeholder="Search..." term="initial" onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe("initial");
  });

  it("calls onSearch once after debounce delay with the latest value", () => {
    const onSearch = vi.fn();
    render(<SearchInput placeholder="Search..." term="" onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;

    // single change -> should call after debounce
    fireEvent.change(input, {target: {value: "abc"}});
    expect(onSearch).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith("abc");
  });

  it("debounces rapid input changes and only calls onSearch for the last value", () => {
    const onSearch = vi.fn();
    render(<SearchInput placeholder="Search..." term="" onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;

    // rapid changes
    fireEvent.change(input, {target: {value: "a"}});
    fireEvent.change(input, {target: {value: "ab"}});
    fireEvent.change(input, {target: {value: "abc"}});

    // still not called immediately
    expect(onSearch).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith("abc");
  });
});
