import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API_URL } from "../constants";
import TableModal from "./TableModal";
import TableHeader from "./TableHeader";
import CreatePostModal from "./CreatePostModal";

interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export class ListPosts extends React.Component<
  {},
  {
    rows: PostData[] | any;
    selectedRows: any;
    open: Boolean;
    delete: Boolean;
    showForm: boolean;
    isEdit: boolean;
    updateRow: any;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      rows: [],
      selectedRows: [],
      open: false,
      delete: false,
      showForm: false,
      isEdit: false,
      updateRow: {},
    };
  }
  getPosts = async () => {
    try {
      const postList = await fetch(API_URL);
      const response: PostData[] = await postList.json();
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    const response = await this.getPosts();
    this.setState({
      rows: response,
    });
  }

  deletePost = (row: PostData) => {
    fetch(`${API_URL}/${row.id}`, {
      method: "DELETE",
    });
    this.handleOpen();
  };

  ediPost = (row: PostData) => {
    this.setState({
      updateRow: row,
      isEdit: true,
    });
    this.showCreateForm();
  };

  getUpdateData = () => {
    return this.state.updateRow;
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false, updateRow: {} });

  showCreateForm = () => {
    this.setState({
      showForm: true,
    });
  };

  handleClosePostForm = () => {
    this.setState({
      showForm: false,
      isEdit: false,
      updateRow: {},
    });
  };

  render() {
    return (
      <>
        <CreatePostModal
          open={this.state.showForm}
          handleClose={this.handleClosePostForm}
          isEdit={this.state.isEdit}
          getUpdateData={this.getUpdateData}
        />
        <TableHeader
          showCreateForm={() => this.showCreateForm()}
          data-test-id="tableHeader"
        />
        <TableModal
          open={this.state.open}
          modalHeader="Delete"
          modalDescription="Post has been deleted."
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Body</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row: PostData) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Button
                      color="inherit"
                      onClick={() => this.deletePost(row)}
                      data-test-id={`delete-post-${row.id}`}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="inherit"
                      onClick={() => this.ediPost(row)}
                      data-test-id={`edit-post-${row.id}`}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row" data-test-id="id">
                    {row.id}
                  </TableCell>
                  <TableCell component="th" scope="row" data-test-id="uid">
                    {row.userId}
                  </TableCell>
                  <TableCell data-test-id="title">{row.title}</TableCell>
                  <TableCell data-test-id="body">{row.body}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default ListPosts;
