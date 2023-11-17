import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { API_URL } from "../constants";

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
    submitForm?: any;
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
    if (this.props.isEdit !== prevProps.isEdit) {
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
    this.props.handleClose()
  }

  submitForm = async (e: any) => {
    e.preventDefault();
    try {
      const rawResponse = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: e.target?.title?.value,
          description: e.target?.description?.value,
        }),
      });
      await rawResponse.json();
    } catch (error) {
      console.log(error);
    }
  };

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
                  this.submitForm(e);
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
                /><br/><br/>
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
                /><br/><br/>
                <button type="submit" data-test-id={"submit-button"} className="btn #673ab7 deep-purple">
                  Save Post
                </button><br/>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default CreatePostModal;
