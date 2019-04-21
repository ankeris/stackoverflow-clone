import { Form, Formik, Field } from "formik";
import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { InputField } from "../components/InputField";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    maxWidth: '600px',
    width: '100%',
  },
});

interface Props {
//   onSubmit: (values: {bodyText: string}) => void;
  classes: any;
}

const PageAuthentication: React.FC<Props> = ({ classes }) => {
    return (
        <div className="content-center content-section">
            <Paper color="primary" className={classes.paper}>
                <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={values => {
                    console.log(values);
                    // onSubmit(values);
                }}
                >
                {({ values }) => (
                    <Form>
                        <Field name="username" type="text" placeholder="Username" component={InputField} />
                        <Field name="password" type="password" placeholder="Password" component={InputField} />
                        <Button type="submit" color="primary" variant="outlined">Login</Button>
                    </Form>
                )}
                </Formik>
            </Paper>
        </div>
    );
}

export default withStyles(styles)(PageAuthentication);