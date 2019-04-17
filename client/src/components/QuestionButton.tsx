import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Question} from '../../../sharedTypes/question.type';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: '900px',
    width: '100%',
    margin: theme.spacing.unit * 2
  },
});

interface Props extends Question {
    classes: any;
}

const QuestionButton: React.FC<Props> = ({classes}) => {

  return (
    <>
      <Paper className={classes.root} elevation={2}>
        <Typography variant="h5" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
    </>
  );
}

export default withStyles(styles)(QuestionButton);