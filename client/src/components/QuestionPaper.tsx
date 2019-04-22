import React, { useState, useEffect, FunctionComponent } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import IconButton from "@material-ui/core/IconButton";
import { Question } from "../../../sharedTypes/question.type";
import Tooltip from "@material-ui/core/Tooltip";
import { RouteComponentProps } from "react-router-dom";

const styles = theme => ({
    wrapper: {
        marginBottom: `${theme.spacing.unit * 2}px`,
        width: "100%",
        maxWidth: "800px"
    },
    paper: {
        padding: theme.spacing.unit * 2
    },
    avatar: {
        backgroundColor: theme.palette.primary.light
    },
    button: {
        "&:disabled": {
            color: theme.palette.primary.light
        }
    }
});

interface Props {
    classes: any;
    liked: boolean;
    question: Question;
    like: () => void;
    dislike: () => void;
}

const QuestionPaper: FunctionComponent<Props> = ({ classes, question, liked, like, dislike }) => {
    return (
        <section className={classes.wrapper + " push-top"}>
            <Paper className={classes.paper}>
                <Grid container spacing={16}>
                    <Grid container alignItems="center" wrap="nowrap">
                        <Grid style={{ textAlign: "center", margin: "0 10px" }}>
                            <Tooltip title={liked ? `You've already liked this question` : "Like"}>
                                <span>
                                    <IconButton disabled={liked} color={liked ? "primary" : "default"} className={classes.button} onClick={like}>
                                        <ThumbUp />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <Avatar color="primary" className={question.upvotesCount > 0 ? classes.avatar : null}>
                                {question.upvotesCount}
                            </Avatar>
                            <IconButton onClick={dislike}>
                                <ThumbDown />
                            </IconButton>
                        </Grid>
                        <Typography variant="h6" component="h3">
                            {question.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>{question.body}</Typography>
                    </Grid>
                </Grid>
                <Grid container direction="column" justify="flex-end" alignItems="flex-end">
                    <Avatar src={question.createdBy.image} color="primary" />
                    <Typography align="right" variant="overline" gutterBottom>
                        {question.createdBy.name} <br />
                        {question.createdAt}
                    </Typography>
                </Grid>
            </Paper>
        </section>
    );
};

export default withStyles(styles)(QuestionPaper);
