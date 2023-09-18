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
    if (this.props.isEdit != prevProps.isEdit) {
      const resp = this.props.getUpdateData();
      this.setState({
        title: resp.title,
        description: resp.body,
      });
    }
  }

  resetForm() {
    this.setState({
      title: "",
      description: "",
    });
  }

  componentDidMount(): void {
    const resp = this.props.getUpdateData();
    this.setState({
      title: resp.title,
      description: resp.body,
    });
  }
  render() {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.props.open}
          onClose={() => {
            this.props.handleClose();
            this.resetForm();
          }}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
          data-test-id="postModal"
        >
          <Fade in={this.props.open}>
            <Box sx={style} data-test-id="postModalContent">
              <form
                className="container"
                onSubmit={(e) => {
                  this.props.submitForm(e);
                  this.resetForm();
                }}
                data-test-id="postForm"
              >
                <input
                  name="title"
                  placeholder="Title"
                  id="title"
                  type="text"
                  value={this.state.title}
                  onChange={(event) => {
                    this.setState(() => {
                      return {
                        title: event.target.value,
                      };
                    });
                  }}
                />
                <input
                  name="description"
                  placeholder="Description"
                  id="description"
                  type="text"
                  value={this.state.description}
                  onChange={(event) => {
                    this.setState({
                      description: event.target.value,
                    });
                  }}
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
