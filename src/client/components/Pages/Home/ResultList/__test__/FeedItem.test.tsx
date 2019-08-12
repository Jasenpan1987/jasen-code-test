import React, { ReactNode } from "react";
import FeedItem from "../FeedItem";
import { render, fireEvent, cleanup } from "@testing-library/react";
import moment from "moment";
import { renderHook, act } from "@testing-library/react-hooks";
import { FlickrItem } from "../../../../App";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

afterEach(cleanup);

const renderWithTheme = (children: ReactNode) =>
  render(<ThemeProvider theme={createMuiTheme()}>{children}</ThemeProvider>);

describe("Test FeedItem", () => {
  let rendered: any;
  let push = jest.fn();
  beforeEach(() => {
    const props: {
      feed: FlickrItem;
      history: {
        push: (url: string) => void;
      };
    } = {
      feed: {
        title: "Lovely dog photo",
        link: "http://abc.xyz.com",
        media: {
          m: "http://foo.bar_m.com"
        },
        date_taken: "2019-08-12T07:45:00Z",
        published: "2019-08-12T07:45:00Z",
        tags: "Photo Dog fun",
        author: "Jasen Pan"
      },
      history: {
        push
      }
    };
    rendered = renderWithTheme(<FeedItem {...props} />);
  });

  it("should rendered correct text", () => {
    const { getByTestId } = rendered;
    expect(getByTestId("title").textContent).toBe("Lovely dog photo");
    expect(getByTestId("author").textContent).toContain("Jasen Pan");
    expect(getByTestId("dateTaken").textContent).toContain(
      moment("2019-08-12T07:45:00Z").format("hh:mm a, DD-MM-YYYY")
    );
  });

  it("should call push function when click on the link", () => {
    const { getByTestId } = rendered;
    fireEvent.click(getByTestId("link"));
    expect(push).toBeCalledWith(
      "image-show?title=Lovely dog photo&imageurl=http://foo.bar_b.com"
    );
  });
});
