import { Button, TextField } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withTheme } from '@material-ui/core';
import { Form, Formik, Field } from "formik";
import * as React from "react";
import { InputField } from "../components/InputField";

interface Values {
  title: string;
  bodyText: string;
}

interface Props {
  onSubmit: (values: Values) => void;
  theme?: any;
}

const FormDialog: React.FC<Props> = ({ onSubmit }) => {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Ask a question +
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'md'} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Post a question to Pile Underflow!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <br />
            Please make sure that your question does not exist before asking
          </DialogContentText>
          <Formik
            initialValues={{ title: "", bodyText: "" }}
            onSubmit={values => {
              onSubmit(values);
            }}
          >
            {({ values }) => (
              <Form>
                <div>
                  <Field
                    name="title"
                    placeholder="Question title"
                    component={InputField}
                  />
                </div>
                <div>
                  <Field name="bodyText" placeholder="Describe the problem" multiline={true} component={InputField} />
                </div>
                <Button type="submit" onClick={handleClose} color="primary" variant="outlined">submit</Button>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withTheme()(FormDialog);