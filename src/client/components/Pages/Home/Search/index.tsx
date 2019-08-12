import React, { useState, useContext, useCallback, memo } from "react";
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
import { SearchContext } from "../../../App";
import { debounce } from "lodash";
// import qs from "query-string";
// import Select from "react-select";

interface IProps {}

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
        backgroundPosition: "top",
        [breakpoints.down("xs")]: {
          height: "35vh"
        }
      },
      mainContent: {
        width: "80%",
        marginLeft: "10%",
        marginRight: "10%",
        zIndex: 2,
        [breakpoints.down("sm")]: {},
        [breakpoints.down("xs")]: {
          width: "96%",
          marginLeft: "2%",
          marginRight: "2%"
        }
      },
      heading: {
        fontSize: 64,
        color: "#fff",
        fontWeight: 700,
        alignSelf: "flex-start",
        marginBottom: 31,
        [breakpoints.down("sm")]: {
          fontSize: 44
        },
        [breakpoints.down("xs")]: {
          fontSize: 32
        }
      },
      inputRoot: {
        width: "100%"
      },
      searchInput: {
        backgroundColor: "#fff",
        borderRadius: 5,
        height: 80,
        fontSize: 34,
        [breakpoints.down("sm")]: {
          height: 65,
          fontSize: 24
        },
        [breakpoints.down("xs")]: {
          height: 65,
          fontSize: 24
        }
      },
      searchIcon: {
        fontSize: 40,
        fontWeight: 500,
        color: "#AFB1B5"
      }
    })
);

const Search = ({  }: IProps) => {
  const classes = useStyles({});
  const { keyword, setKeyword, pending } = useContext(SearchContext);

  const [localKeyword, setLocalKeyword] = useState(keyword);

  const throttledSetKeyword = useCallback(debounce(setKeyword, 1000), []);

  const handleKeywordChange = (e: any) => {
    setLocalKeyword(e.target.value);
    throttledSetKeyword(e.target.value);
  };

  return (
    <div className={classes.contentContainer}>
      <div className={classes.mainContent}>
        <Typography
          variant="h2"
          data-testid="findPhoto"
          className={classes.heading}
        >
          Find your best photos
        </Typography>
        <TextField
          value={localKeyword}
          onChange={handleKeywordChange}
          classes={{ root: classes.inputRoot }}
          inputProps={{ "data-testid": "keywordInput" }}
          InputProps={{
            className: classes.searchInput,
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon className={classes.searchIcon} />
              </InputAdornment>
            )
          }}
          placeholder="Search your image"
          margin="normal"
          variant="outlined"
          fullWidth
        />
      </div>
    </div>
  );
};

export default memo(Search);
