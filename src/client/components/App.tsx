import React, { createContext, useState, useRef, useEffect } from "react";
import fetchData from "../commons/utils/fetchData";
import { ThemeProvider } from "@material-ui/styles";
import Routes from "./Routes";
import { createMuiTheme } from "@material-ui/core";

export type FlickrItem = {
  title: string;
  link: string;
  media: {
    m: string;
  };
  date_taken: string;
  published: string;
  tags: string;
  author: string;
};

export type FlickrFeed = {
  title: string;
  link: string;
  description: string;
  modified: string;
  generator: string;
  items: FlickrItem[];
};

interface IContextState {
  pending: boolean;
  setKeyword: (keyword: string) => void;
  feeds: FlickrItem[];
  keyword: string;
  error: any;
  initial: boolean;
}

export const SearchContext = createContext<IContextState>({
  pending: false,
  setKeyword: (keywords: string) => {},
  feeds: [],
  keyword: "",
  error: undefined,
  initial: true
});

export default () => {
  const [pending, setPending] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState(undefined);
  const isFirstLoad = useRef(true);

  const handleSearch = async () => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    setFeeds([]);
    if (keyword.length > 2) {
      setPending(true);
      fetchData<FlickrFeed>(keyword)
        .then(data => {
          setFeeds(data.items);
          setPending(false);
        })
        .catch(error => {
          setError(error);
          setPending(false);
        });
    }
  };

  useEffect(() => {
    handleSearch();
  }, [keyword]);

  return (
    <SearchContext.Provider
      value={{
        pending,
        setKeyword,
        error,
        feeds,
        keyword,
        initial: isFirstLoad.current
      }}
    >
      <Routes />
    </SearchContext.Provider>
  );
};
