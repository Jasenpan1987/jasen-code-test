import React, { ReactNode } from "react";
import ResultList from "../index";
import { render, fireEvent, cleanup } from "@testing-library/react";
import moment from "moment";
import { renderHook, act } from "@testing-library/react-hooks";
import { MemoryRouter } from "react-router-dom";
import { FlickrItem, SearchContext } from "../../../../App";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

afterEach(cleanup);

describe("Test result list", () => {
  let setKeyword = jest.fn();
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
  beforeEach(() => {});

  it("should load correct text", () => {
    const { getByTestId } = renderWithContext(<ResultList />, {
      value: {
        pending: false,
        setKeyword,
        feeds: [],
        keyword: "",
        error: undefined,
        initial: true
      }
    });

    expect(getByTestId("heading").textContent).toBe(
      "Type your keywords and get your results"
    );
  });

  it("should show pending text when pending", () => {
    const { getByTestId } = renderWithContext(<ResultList />, {
      value: {
        pending: true,
        setKeyword,
        feeds: [],
        keyword: "",
        error: undefined,
        initial: false
      }
    });

    expect(getByTestId("pending").textContent).toBe("Loading Images...");
  });

  it("should show 2 results when there are 2 feeds", () => {
    const { getByTestId } = renderWithContext(<ResultList />, {
      value: {
        pending: false,
        setKeyword,
        feeds: [
          {
            title: "Lovely dog photo1",
            link: "http://abc.xyz1.com",
            media: {
              m: "http://foo1.bar_m.com"
            },
            date_taken: "2019-08-12T07:45:00Z",
            published: "2019-08-12T07:45:00Z",
            tags: "Photo Dog fun",
            author: "Jasen Pan"
          },
          {
            title: "Lovely dog photo2",
            link: "http://abc.xyz2.com",
            media: {
              m: "http://foo2.bar_m.com"
            },
            date_taken: "2019-08-12T07:45:00Z",
            published: "2019-08-12T07:45:00Z",
            tags: "Photo Dog fun",
            author: "Jasen Pan"
          }
        ],
        keyword: "Hello",
        error: undefined,
        initial: false
      }
    });

    expect(getByTestId("resultHeading").textContent).toBe(
      `2 results for keyword "Hello"`
    );
  });
});
