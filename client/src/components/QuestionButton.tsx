import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Question} from '../../../sharedTypes/question.type';
import CardActionArea from '@material-ui/core/CardActionArea';

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  btn: {
    width: '100%',
    marginBottom: `${theme.spacing.unit * 2}px`,
    maxWidth: '800px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
  }
});

interface Props extends Question {
    classes: any;
    id: any;
    handleClick: (id: string) => void;
}

const QuestionButton: React.FC<Props> = ({handleClick, id, classes, title, upvotesCount, createdAt, createdBy}) => {
  return (
        <CardActionArea className={classes.btn} onClick={() => handleClick(id)}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={16}>
              <Grid item>
                <Avatar color="primary" className={upvotesCount > 0 ? classes.avatar : null}>{upvotesCount}</Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h6" component="h3">{title}</Typography>
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
        </CardActionArea>
  );
}

export default withStyles(styles)(QuestionButton);