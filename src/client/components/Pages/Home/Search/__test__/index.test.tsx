import React, { ReactNode } from "react";
import Search from "../index";
import {
  render,
  fireEvent,
  cleanup,
  RenderResult
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchContext } from "../../../../App";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

afterEach(cleanup);

describe("Test result list", () => {
  const setKeyword = jest.fn();
  let rendered: RenderResult;

  function renderWithContext(
    node: ReactNode,
    { value, ...options }: { value: any }
  ) {
    return render(
      <MemoryRouter>
        <ThemeProvider theme={createMuiTheme()}>
          <SearchContext.Provider value={value}>{node}</SearchContext.Provider>
        </ThemeProvider>
      </MemoryRouter>,
      options
    );
  }
  beforeEach(() => {
    rendered = renderWithContext(<Search />, {
      value: {
        pending: false,
        setKeyword,
        feeds: [],
        keyword: "",
        error: undefined,
        initial: true
      }
    });
  });

  it("should have the correct heading text", () => {
    const { getByTestId } = rendered;

    expect(getByTestId("findPhoto").textContent).toBe("Find your best photos");
  });

  it("should be able to type the keyword", () => {
    const { getByTestId } = rendered;
    const container = getByTestId("keywordInput") as HTMLInputElement;
    fireEvent.change(container, { target: { value: "ab" } });
    expect(container.value).toBe("ab");
  });

  it("should not trigger the setKeyword with in the throttle time", done => {
    const { getByTestId } = rendered;

    const container = getByTestId("keywordInput") as HTMLInputElement;
    fireEvent.change(container, { target: { value: "ab" } });
    setTimeout(() => {
      expect(setKeyword).toBeCalledTimes(0);
      done();
    }, 600);
  });
  it("should trigger the setKeyword correctly", done => {
    const { getByTestId } = rendered;

    const container = getByTestId("keywordInput") as HTMLInputElement;
    fireEvent.change(container, { target: { value: "abc" } });
    setTimeout(() => {
      expect(setKeyword).toBeCalledWith("abc");
      done();
    }, 2000);
  });
});
