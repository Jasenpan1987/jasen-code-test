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
        cursor: "pointer",
        [breakpoints.down("xs")]: {
          padding: "10px 8px",
          marginBottom: 10
        }
      },
      listContent: {
        marginRight: "auto"
      },
      thumbnail: {
        width: 65,
        height: 65,
        marginRight: 20,
        [breakpoints.down("xs")]: {
          width: 45,
          height: 45,
          marginRight: 10
        }
      },
      listItemTitle: {
        fontSize: 24,
        fontWeight: 500,
        maxWidth: 500,
        letterSpacing: 1.05,
        lineHeight: 1.2,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        [breakpoints.down("xs")]: {
          fontSize: 17
        }
      },
      listItemDescription: {
        fontSize: 14,
        letterSpacing: 1.05,
        [breakpoints.down("xs")]: {
          fontSize: 12
        }
      },
      listItemTags: {
        fontSize: 12,
        letterSpacing: 1.15,
        marginTop: 5,
        fontWeight: 500,
        color: palette.primary.main
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
  feed: { title, media, date_taken, author, tags },
  history
}: IProps) => {
  const classes = useStyles({});

  return (
    <ListItem
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
          data-testid="title"
          className={classes.listItemTitle}
          color="primary"
        >
          {title}
        </Typography>
        <Typography
          data-testid="author"
          variant="body1"
          className={classes.listItemDescription}
        >
          <b>Taken By:</b> {author}
        </Typography>
        <Typography
          data-testid="dateTaken"
          variant="body1"
          className={classes.listItemDescription}
        >
          <b>Date Taken:</b> {moment(date_taken).format("hh:mm a, DD-MM-YYYY")}
        </Typography>
        <Typography variant="body2" className={classes.listItemTags}>
          <b>Tags: </b>
          {tags}
        </Typography>
      </div>
      <LinkIcon data-testid="link" className={classes.linkIcon} />
    </ListItem>
  );
};

export default memo(FeedItem);
