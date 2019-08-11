import React, { useState, useContext, useCallback } from "react";
import {
  Theme,
  Typography,
  Button,
  TextField,
  InputAdornment
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import PendingIcon from "@material-ui/icons/ErrorOutline";
import { SearchContext } from "..";
import { debounce } from "lodash";
// import qs from "query-string";
// import Select from "react-select";

interface IProps {}

// background-image: linear-gradient(
//   to right bottom,
//   rgba($color-primary-light, 0.8),
//   rgba($color-primary-dark, 0.8)
//   ), url("../img/hero-small.jpg");
// url(/images/homepage/header-bg.jpg)
const useStyles = makeStyles(
  ({ mixins, palette, breakpoints, spacing }: Theme) =>
    createStyles({
      contentContainer: {
        backgroundImage:
          "linear-gradient(to right bottom, rgba(108,94,158,0.5), rgba(108,94,158,0.5)), url(/images/header-bg.jpg)",
        height: "45vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "top"
      },
      mainContent: {
        width: 1020,
        zIndex: 2
      },
      heading: {
        fontSize: 64,
        color: "#fff",
        fontWeight: 700,
        alignSelf: "flex-start",
        marginBottom: 31
      },
      inputRoot: {
        width: "70%"
      },

      searchInput: {
        backgroundColor: "#fff",
        borderRadius: 5,
        height: 50,
        fontSize: 24
      }
    })
);

const Search = ({  }: IProps) => {
  const classes = useStyles({});
  const { keyword, setKeyword, pending } = useContext(SearchContext);

  const [localKeyword, setLocalKeyword] = useState(keyword);

  const throttledSetKeyword = useCallback(debounce(setKeyword, 1000), []);

  const handleKeywordChange = e => {
    setLocalKeyword(e.target.value);
    throttledSetKeyword(e.target.value);
  };

  return (
    <div className={classes.contentContainer}>
      <div className={classes.mainContent}>
        <Typography variant="h2" className={classes.heading}>
          Find your best photos
        </Typography>
        <TextField
          value={localKeyword}
          onChange={handleKeywordChange}
          classes={{ root: classes.inputRoot }}
          InputProps={{
            className: classes.searchInput,
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          style={{ margin: 8 }}
          placeholder="Search your image"
          margin="normal"
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default Search;
