import React, { useEffect, useState, FunctionComponent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    notificationBox: {
      backgroundColor:  theme.palette.primary.main
    },
});

interface Props {
    classes: any;
    text: string;
    close: () => void;
}

const Notification: React.FC<Props> = ({classes, text, close}) => {
    const [opened, setOpened] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setOpened(false);
            close();
        }, 3000 );
    })
  return (
    <div>
      <Snackbar
        className={classes.notificationBox}
        open={opened}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{text}</span>}
      />
    </div>
  );
}
export default withStyles(styles)(Notification)

