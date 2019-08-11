import React, { ReactChild, ReactChildren, ReactNode } from "react";
import { createStyles, makeStyles, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { compose } from "recompose";
import { ThemeProvider } from "@material-ui/styles";
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

interface IProps {
  children: ReactNode;
}

const Layout = (props: IProps) => {
  const { children } = props;
  const classes = useStyles({});
  return (
    <ThemeProvider theme={createMuiTheme()}>
      <div className={classes.root}>
        <CssBaseline />
        {children}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
