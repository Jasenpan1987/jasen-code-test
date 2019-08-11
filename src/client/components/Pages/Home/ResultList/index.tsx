import React, { useContext, memo } from "react";
import { createStyles, Theme, Typography, List } from "@material-ui/core";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { SearchContext } from "../../../App";
import { useRouter } from "../../../../commons/utils/useRouter";
import FeedItem from "./FeedItem";

const useStyles = makeStyles(
  ({ mixins, palette, breakpoints, spacing }: Theme) =>
    createStyles({
      root: {
        padding: "30px 40px",
        [breakpoints.down("xs")]: {
          padding: "20px 0"
        }
      },
      headingText: {
        fontSize: 30,
        fontWeight: 500,
        textAlign: "center",
        letterSpacing: 1.15,
        marginBottom: 25,
        [breakpoints.down("sm")]: {
          fontSize: 23,
          marginBottom: 20
        },
        [breakpoints.down("xs")]: {
          fontSize: 18,
          marginBottom: 10
        }
      },
      listWrapper: {}
    })
);

const ResultList = () => {
  const classes = useStyles({});
  const { pending, feeds, keyword, initial } = useContext(SearchContext);
  const { history } = useRouter();
  console.log(pending, feeds, keyword);

  if (initial) {
    return (
      <main className={classes.root}>
        <Typography variant="h2" className={classes.headingText}>
          Type your keywords and get your results
        </Typography>
      </main>
    );
  }

  if (pending) {
    return (
      <main className={classes.root}>
        <Typography variant="h2" className={classes.headingText}>
          Loading Images...
        </Typography>
      </main>
    );
  }
  return (
    <main className={classes.root}>
      <Typography variant="h2" className={classes.headingText}>
        {feeds.length} results for keyword "{keyword}"
      </Typography>
      <List className={classes.listWrapper}>
        {feeds.map(feed => (
          <FeedItem feed={feed} history={history} />
        ))}
      </List>
    </main>
  );
};

export default memo(ResultList);
