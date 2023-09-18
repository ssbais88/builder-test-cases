import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export class TableModal extends React.Component<
  {
    open: any;
    handleOpen: any;
    handleClose: any;
    modalHeader: string;
    modalDescription: string;
  },
  {}
> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={this.props.open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                data-test-id="deleteTitle"
              >
                {this.props.modalHeader}
              </Typography>
              <Typography
                id="transition-modal-description"
                sx={{ mt: 2 }}
                data-test-id="deleteDesc"
              >
                {this.props.modalDescription}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default TableModal;
