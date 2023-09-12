import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

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
export class CreatePostModal extends React.Component<
  {
    open: boolean;
    handleClose: any;
    submitForm: any;
    isEdit: boolean;
    getUpdateData: any;
  },
  { title: string; description: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      description: "",
    };
  }

  componentDidUpdate(prevProps: any) {
    console.log(this.props);
    if (this.props.isEdit != prevProps.isEdit) {
      const resp = this.props.getUpdateData();
      console.log("RESPONSE ", resp);
      this.setState({
        title: resp.title,
        description: resp.body,
      });
    }
  }

  componentDidMount(): void {}
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
              <form
                className="container"
                onSubmit={(e) => this.props.submitForm(e)}
              >
                <input
                  name="title"
                  placeholder="Title"
                  id="title"
                  type="text"
                  value={this.state.title}
                />
                <input
                  name="description"
                  placeholder="Description"
                  id="description"
                  type="text"
                  value={this.state.description}
                />
                <button type="submit" className="btn #673ab7 deep-purple">
                  Save Post
                </button>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default CreatePostModal;
