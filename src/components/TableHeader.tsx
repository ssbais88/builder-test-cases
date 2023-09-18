import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export class TableHeader extends React.Component<
  { showCreateForm: any },
  {}
> {
  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Posts
            </Typography>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => this.props.showCreateForm()}
              data-test-id='btnAddPost'
            >
              Add Post
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default TableHeader;
