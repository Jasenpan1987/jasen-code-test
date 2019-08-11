import React from "react";
import { RouteProps } from "react-router";
import qs from "query-string";
import { makeStyles, Theme, createStyles, Typography } from "@material-ui/core";
import GoBackIcon from "@material-ui/icons/ChevronLeft";
import { useRouter } from "../../../commons/utils/useRouter";

interface IProps extends RouteProps {}

const useStyles = makeStyles(
  ({ mixins, palette, breakpoints, spacing }: Theme) =>
    createStyles({
      imageWrapper: {
        maxWidth: "100%",
        maxHeight: "calc(100vh - 50px)",
        [breakpoints.down("xs")]: {}
      },
      image: {
        width: "50%",
        display: "block",
        margin: "40px auto",
        border: "10px solid #ccc",
        borderRadius: 10,
        boxShadow: "7px 9px 22px 12px rgba(0,0,0,0.75)",
        [breakpoints.down("md")]: {
          width: "80%"
        }
      },
      titleWrapper: {
        backgroundColor: "#ccc",
        height: "50px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        [breakpoints.down("md")]: {
          height: "65px"
        }
      },

      heading: {
        fontSize: 28,
        textAlign: "center",
        width: "100%"
      },
      goback: {
        fontSize: 40,
        cursor: "pointer"
      }
    })
);

export default (props: IProps) => {
  const classes = useStyles({});
  const { history } = useRouter();
  const { imageurl, title } = qs.parse(props.location.search);
  return (
    <main>
      <div className={classes.titleWrapper}>
        <GoBackIcon className={classes.goback} onClick={history.goBack} />
        <Typography variant="h3" className={classes.heading}>
          {title}
        </Typography>
      </div>
      <div className={classes.imageWrapper}>
        <img
          className={classes.image}
          src={Array.isArray(imageurl) ? imageurl[0] : imageurl}
          alt="image"
        />
      </div>
    </main>
  );
};
