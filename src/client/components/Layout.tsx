import React from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { compose } from "recompose";
// import Header from "./Header";
// import { withRoot } from "./withRootHoc";
// import { withRootContext } from "./context";
// import { OverlayLoader } from "UI/OverlayLoader";
// import { Notification } from "UI/Notification";

const useStyles = makeStyles(({ palette }) => {
  return createStyles({
    root: {
      minHeight: "100vh",
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0)"
    }
  });
});

const Layout = props => {
  const { children } = props;
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <Header /> */}
      {children}
    </div>
  );
};

// const withRootAndContext = compose(
//   withRoot,
//   withRootContext
// );

export default Layout;
