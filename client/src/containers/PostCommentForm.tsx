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
  onSubmit: (values: {bodyText: string}) => void;
  classes: any;
}

const PostCommentForm: React.FC<Props> = ({ classes, onSubmit }) => {
    return (
        <Paper color="primary" className={classes.paper}>
            <Formik
              initialValues={{ bodyText: "" }}
              onSubmit={values => {
                onSubmit(values);
              }}
            >
              {({ values }) => (
                <Form>
                  <div>
                    <Field name="bodyText" placeholder="Post your answer here" multiline={true} component={InputField} />
                  </div>
                  <Button type="submit" color="primary" variant="outlined">submit</Button>
                </Form>
              )}
            </Formik>
        </Paper>
    );
}

export default withStyles(styles)(PostCommentForm);