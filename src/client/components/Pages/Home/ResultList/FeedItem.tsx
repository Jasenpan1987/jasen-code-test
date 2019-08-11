import React, { memo } from "react";
import moment from "moment";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme, ListItem, Avatar, Typography } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/ChevronRight";
import { FlickrItem } from "../../../App";

const useStyles = makeStyles(
  ({ mixins, palette, breakpoints, spacing }: Theme) =>
    createStyles({
      listItemWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #ccc",
        padding: "25px 20px",
        borderRadius: 5,
        backgroundColor: "#dfe2e6",
        marginBottom: 25,
        cursor: "pointer"
      },
      listContent: {
        marginRight: "auto"
      },
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
      },
      linkIcon: {
        fontSize: 40
      }
    })
);

interface IProps {
  feed: FlickrItem;
  history: {
    push: (url: string) => void;
  };
}

const FeedItem = ({
  feed: { title, media, date_taken, author },
  history
}: IProps) => {
  const classes = useStyles({});

  return (
    <ListItem
      key={media.m}
      className={classes.listItemWrapper}
      onClick={() => {
        history.push(
          `image-show?title=${title}&imageurl=${media.m.replace("_m.", "_b.")}`
        );
      }}
    >
      <Avatar alt={title} src={media.m} className={classes.thumbnail} />
      <div className={classes.listContent}>
        <Typography
          variant="h4"
          component="div"
          className={classes.listItemTitle}
          color="primary"
        >
          {title}
        </Typography>
        <Typography variant="body1" className={classes.listItemDescription}>
          <b>Taken By:</b> {author}
        </Typography>
        <Typography variant="body1" className={classes.listItemDescription}>
          <b>Date Taken:</b> {moment(date_taken).format("hh:mm a, DD-MM-YYYY")}
        </Typography>
      </div>
      <LinkIcon className={classes.linkIcon} />
    </ListItem>
  );
};

export default memo(FeedItem);
