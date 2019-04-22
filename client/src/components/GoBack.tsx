import * as React from "react";
import Button from "@material-ui/core/Button/Button";

export const GoBack = ({ history }) => (
    <Button onClick={() => history.goBack()} color="default" variant="contained">
        Go back 🚪
    </Button>
);
