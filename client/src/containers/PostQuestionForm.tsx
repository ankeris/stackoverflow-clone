import { Button, TextField, Fab, Paper, Typography, Grid, withStyles } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { unstable_Box as Box } from '@material-ui/core/Box';
import { Form, Formik, Field } from "formik";
import * as React from "react";
import { InputField } from "../components/InputField";
import { PostQuestionFormValues } from "../routes/PageQuestionsList";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
  },
  palette: {
    
  }
});
interface Props {
  onSubmit: (values: PostQuestionFormValues) => void;
  classes: any;
}

const FormDialog: React.FC<Props> = ({ classes, onSubmit }) => {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Box mx="auto" bgcolor="background.paper" p={1} m={2}>
        <Grid container alignItems="center" wrap="nowrap" className="palette">
          <Box p={1}>
            Add question
          </Box>
          <Fab color="primary" aria-label="Add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Grid>
      </Box>
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
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(FormDialog);