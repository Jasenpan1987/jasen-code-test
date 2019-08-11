import React, { useContext } from "react";
import {
  createStyles,
  Theme,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@material-ui/core";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import { SearchContext } from "..";

const useStyles = makeStyles(
  ({ mixins, palette, breakpoints, spacing }: Theme) =>
    createStyles({
      root: {
        padding: "30px 40px"
      },
      headingText: {
        fontSize: 30,
        fontWeight: 500,
        textAlign: "center",
        letterSpacing: 1.15,
        marginBottom: 25
      },
      listWrapper: {},
      listItemWrapper: {
        border: "1px solid #ccc",
        padding: "25px 20px",
        borderRadius: 5,
        backgroundColor: "light-grey",
        marginBottom: 25
      },
      listContent: {},
      thumbnail: {
        width: 65,
        height: 65,
        marginRight: 20
      },
      listItemTitle: {
        fontSize: 24,
        fontWeight: 500,
        maxWidth: 500,
        letterSpacing: 1.05,
        lineHeight: 1.2,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden"
      },
      listItemDescription: {
        fontSize: 14,
        letterSpacing: 1.05
      }
    })
);

const ResultList = () => {
  const classes = useStyles({});
  const { pending, feeds, keyword, initial } = useContext(SearchContext);
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
          Pending...
        </Typography>
      </main>
    );
  }
  return (
    <main className={classes.root}>
      <Typography variant="h2" className={classes.headingText}>
        {feeds.length} results for keyword {keyword}
      </Typography>
      <List className={classes.listWrapper}>
        {feeds.map(item => (
          <ListItem className={classes.listItemWrapper}>
            <Avatar
              alt={item.title}
              src={item.media.m}
              className={classes.thumbnail}
            />
            <div className={classes.listContent}>
              <Typography
                variant="h4"
                component="div"
                className={classes.listItemTitle}
                color="primary"
              >
                {item.title}
              </Typography>
              <Typography
                variant="body1"
                className={classes.listItemDescription}
              >
                <b>Taken By:</b> {item.author}
              </Typography>
              <Typography
                variant="body1"
                className={classes.listItemDescription}
              >
                <b>Date Taken:</b>{" "}
                {moment(item.date_taken).format("hh:mm a, DD-MM-YYYY")}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </main>
  );
};

export default ResultList;
