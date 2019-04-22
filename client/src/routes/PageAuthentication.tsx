import { Form, Formik, Field } from "formik";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { InputField } from "../components/InputField";
import UsersService from "../services/users.service";

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
        maxWidth: "600px",
        width: "100%"
    }
});

interface Props extends RouteComponentProps {
    //   onSubmit: (values: {bodyText: string}) => void;
    classes: any;
    setAuth: () => void;
}

const PageAuthentication: React.FC<Props> = ({ history, classes, setAuth }) => {
    const [open, setOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errmsg, setErrmsg] = useState("");
    const [regMsg, setRegMsg] = useState("");

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        setRegMsg("");
    }

    function register(values) {
        UsersService.registerUser(values).then(response => {
            if (response.status !== 500) {
                response.message.then(msg => setSuccessMsg("You have successfully created an account. Log in now 😎"));
                setOpen(false);
            } else {
                response.message.then(msg => setRegMsg(msg));
            }
        });
    }
    function login(values) {
        UsersService.login(values).then(
            resolved => {
                setErrmsg("");
                const token = resolved;
                localStorage.setItem("token", token);
                setAuth();
                history.push("/questions/");
            },
            rejected => {
                setErrmsg("Username or password incorrect!");
            }
        );
    }
    return (
        <div className="content-center content-section">
            <Paper color="primary" className={classes.paper}>
                <Typography variant="h5" component="h4">
                    Login to PileUnderflow! 🙋‍
                </Typography>
                {successMsg ? <Typography color="primary">{successMsg}</Typography> : ""}
                {errmsg ? <Typography color="secondary">{errmsg}</Typography> : ""}
                <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={values => {
                        login(values);
                    }}
                >
                    {({ values }) => (
                        <Form>
                            <Field name="username" type="text" placeholder="Username" component={InputField} />
                            <Field name="password" type="password" placeholder="Password" component={InputField} />
                            <Button type="submit" color="primary" variant="outlined">
                                Login
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>

            {/* Register */}
            <div className="push-top">
                <Button onClick={handleClickOpen} type="button" color="secondary" variant="contained">
                    Don't have an account yet?
                </Button>
                <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm" aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Register form. Welcome! 🎉</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={{ username: "", password: "" }}
                            onSubmit={values => {
                                register(values);
                            }}
                        >
                            {({ values }) => (
                                <Form>
                                    {regMsg ? <Typography color="error">{regMsg}</Typography> : ""}
                                    <Field name="username" type="text" placeholder="Type username" component={InputField} />
                                    <Field name="password" type="password" placeholder="Type new password" component={InputField} />
                                    <Button type="submit" color="primary" variant="outlined">
                                        Register
                                    </Button>
                                    <Button onClick={handleClose} color="secondary">
                                        Cancel
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default withStyles(styles)(PageAuthentication);
