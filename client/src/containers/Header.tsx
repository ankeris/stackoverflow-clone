import React, { useContext, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { AppContext } from "../App";

const styles = {
    root: {
        flexGrow: 1
    },
    appbar: {
        background: "linear-gradient(to right, #464646, #484754, #484963, #454b73, #3e4d83)"
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};

function ButtonAppBar(props) {
    const { User, isLoggedIn } = useContext(AppContext);
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Pile Underflow
                    </Typography>
                    {isLoggedIn ? (
                        <>
                            <Typography variant="h6" color="inherit" className={classes.menuButton}>
                                Logged in as {User.name}
                            </Typography>
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    window.location.href = "/login";
                                }}
                            >
                                Log out
                            </Button>
                        </>
                    ) : (
                        <Button color="primary" variant="contained">
                            Log in
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(ButtonAppBar);
