import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Comment} from '../../../sharedTypes/comment.type';

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    marginBottom: `${theme.spacing.unit * 2}px`,
    width: '100%',
    maxWidth: '800px',
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
  }
});

interface Props {
    classes: any;
    body: string;
    upvotesCount: number;
    createdBy: any;
    createdAt: Date;
}

const CommentItem: React.FC<Props> = ({classes, body, upvotesCount, createdAt, createdBy}) => {
  return (
    <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={16}>
            <Grid item xs>
                <Typography>{body}</Typography>
            </Grid>
            <Grid item>
                <Typography align="right" variant="overline" gutterBottom>
                {createdBy.name}
                </Typography>
                <Typography align="right" variant="overline" gutterBottom>
                {createdAt}
                </Typography>
            </Grid>
        </Grid>
    </Paper>
  );
}

export default withStyles(styles)(CommentItem);