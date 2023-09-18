import React from "react";
import { ShallowWrapper, shallow } from "enzyme";
import ListPosts from "./components/ListPosts";
import CreatePostModal from "./components/CreatePostModal";
import TableModal from "./components/TableModal";

const postList = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    userId: 1,
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    userId: 1,
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
  {
    userId: 1,
    id: 6,
    title: "dolorem eum magni eos aperiam quia",
    body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
  },
  {
    userId: 1,
    id: 7,
    title: "magnam facilis autem",
    body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
  },
  {
    userId: 1,
    id: 8,
    title: "dolorem dolore est ipsam",
    body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
  },
  {
    userId: 1,
    id: 9,
    title: "nesciunt iure omnis dolorem tempora et accusantium",
    body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
  },
  {
    userId: 1,
    id: 10,
    title: "optio molestias id quia eum",
    body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error",
  },
];

const postListMock = () => {
  return jest
    .spyOn(global, "fetch")
    .mockImplementation(() => Promise.resolve({ json: () => postList }));
};

describe("User navigates to App", () => {
  let exampleBlockA: ShallowWrapper;
  let instance: ListPosts;

  it("I am user loading posts list", () => {
    exampleBlockA = shallow(<ListPosts />);
  });

  it("I navigates to posts list", () => {
    instance = exampleBlockA.instance() as ListPosts;
  });

  it("Posts list will load without errors", () => {
    expect(exampleBlockA).toBeDefined();
  });

  it("Render list data without errors", async () => {
    // instance.componentDidMount();
    // expect(instance.state.rows).toEqual(postList);
  });

  // it("Fetch data from api", () => {

  // })

  // it("User can delete a post", () => {
  //   const deletePost = exampleBlockA.findWhere(
  //     (node) => node.prop("data-test-id") === "delete-post"
  //   );
  //   deletePost.simulate("click");
  // })
});

describe("User can view table list data", () => {
  let wrapper: ShallowWrapper;

  const fetchMock = postListMock();

  it("I am user loading posts list", () => {
    wrapper = shallow(<ListPosts />);
  });

  it("I navigates to posts list", () => {
    expect(fetchMock).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts"
    );
  });

  it("Posts list id will load without errors", () => {
    const respData = postList[0];
    const dataId = wrapper
      .findWhere((node) => node.prop("data-test-id") === "id")
      .at(0);
    expect(dataId.text()).toBe(respData.id.toString());
  });

  it("Posts list user id will load without errors", () => {
    const respData = postList[1];
    const dataId = wrapper
      .findWhere((node) => node.prop("data-test-id") === "uid")
      .at(1);
    expect(dataId.text()).toBe(respData.userId.toString());
  });

  it("Posts list title will load without errors", () => {
    const respData = postList[2];
    const dataId = wrapper
      .findWhere((node) => node.prop("data-test-id") === "title")
      .at(2);
    expect(dataId.text()).toBe(respData.title.toString());
  });

  it("Posts list description will load without errors", () => {
    const respData = postList[3];
    const dataId = wrapper
      .findWhere((node) => node.prop("data-test-id") === "body")
      .at(3);
    expect(dataId.text()).toBe(respData.body.toString());
  });
});

describe("User should be able to open add post form", () => {
  let wrapper: ShallowWrapper;

  postListMock();

  it("I am user loading posts list", () => {
    wrapper = shallow(<ListPosts />);
  });

  it("User click on Add post button", () => {
    const addBtn = wrapper
      .findWhere((node) => node.prop("data-test-id") === "tableHeader")
      .dive()
      .findWhere((node) => node.prop("data-test-id") === "btnAddPost");

    addBtn.simulate("click");
  });

  it("Add post dialog should open without errors", () => {
    const addPostDialog = wrapper
      .find(CreatePostModal)
      .dive()
      .findWhere((node) => node.prop("data-test-id") === "postModal");
    expect(addPostDialog.exists()).toBe(true);
  });
});

describe("User should be able to open edit post form", () => {
  let wrapper: ShallowWrapper;

  postListMock();

  it("I am user loading posts list", () => {
    wrapper = shallow(<ListPosts />);
  });

  it("User click on Edit post button", () => {
    const editBtn = wrapper
      .findWhere((node) => node.prop("data-test-id") === "edit-post")
      .at(0);

    editBtn.simulate("click");
  });

  it("Edit post dialog should open without errors", () => {
    const editPostDialog = wrapper
      .find(CreatePostModal)
      .dive()
      .findWhere((node) => node.prop("data-test-id") === "postModal")
      .findWhere((node) => node.prop("name") === "title");

    const postTitle = postList[0].title;

    expect(editPostDialog.prop("value")).toBe(postTitle);
  });
});

describe("User should be able to edit post form title and description", () => {
  let wrapper: ShallowWrapper;
  const titleText: string = "titleText";
  const descriptionText: string = "descriptionText";
  const handleCloseFn = jest.fn();
  const handleSubmitFn = jest.fn();

  const dialogData = { title: "title", body: "description" };
  const getUpdateDataFn = jest.fn().mockImplementation(() => {
    return dialogData;
  });
  const screenProps = {
    open: true,
    handleClose: handleCloseFn,
    submitForm: handleSubmitFn,
    isEdit: true,
    getUpdateData: getUpdateDataFn,
  };

  it("I am user loading post modal", () => {
    wrapper = shallow(<CreatePostModal {...screenProps} />);
  });

  it("User try to edit title", () => {
    const editPostTitleInput = wrapper
      .findWhere((node) => node.prop("data-test-id") === "postModal")
      .findWhere((node) => node.prop("name") === "title");

    expect(editPostTitleInput.prop("value")).toBe(dialogData.title);

    editPostTitleInput.simulate("change", { target: { value: titleText } });
  });

  it("User should be able to see edited title without error", () => {
    const editPostTitleInput = wrapper
      .findWhere((node) => node.prop("data-test-id") === "postModal")
      .findWhere((node) => node.prop("name") === "title");

    expect(editPostTitleInput.prop("value")).toBe(titleText);
  });

  it("User try to edit description", () => {
    const editPostDescInput = wrapper
      .findWhere((node) => node.prop("data-test-id") === "postModal")
      .findWhere((node) => node.prop("name") === "description");

    expect(editPostDescInput.prop("value")).toBe(dialogData.body);

    editPostDescInput.simulate("change", {
      target: { value: descriptionText },
    });
  });

  it("User should be able to see edited description without error", () => {
    const editPostDescInput = wrapper
      .findWhere((node) => node.prop("data-test-id") === "postModal")
      .findWhere((node) => node.prop("name") === "description");

    expect(editPostDescInput.prop("value")).toBe(descriptionText);
  });
});

describe("User should be able to submit form", () => {
  let wrapper: ShallowWrapper;
  const titleText: string = "titleText";
  const descriptionText: string = "descriptionText";
  const handleCloseFn = jest.fn();
  const handleSubmitFn = jest.fn();

  const dialogData = { title: "title", body: "description" };
  const getUpdateDataFn = jest.fn().mockImplementation(() => {
    return dialogData;
  });
  const screenProps = {
    open: true,
    handleClose: handleCloseFn,
    submitForm: handleSubmitFn,
    isEdit: true,
    getUpdateData: getUpdateDataFn,
  };

  it("I am user loading posts modal", () => {
    wrapper = shallow(<CreatePostModal {...screenProps} />);
  });

  it("User try to edit title and description and submit the form", () => {
    const editPostTitleInput = wrapper
      .findWhere((node) => node.prop("data-test-id") === "postModal")
      .findWhere((node) => node.prop("name") === "title");

    expect(editPostTitleInput.prop("value")).toBe(dialogData.title);

    editPostTitleInput.simulate("change", { target: { value: titleText } });

    const editPostDescInput = wrapper
      .findWhere((node) => node.prop("data-test-id") === "postModal")
      .findWhere((node) => node.prop("name") === "description");

    expect(editPostDescInput.prop("value")).toBe(dialogData.body);

    editPostDescInput.simulate("change", {
      target: { value: descriptionText },
    });

    const submitBtn = wrapper
      .findWhere((node) => node.prop("data-test-id") === "postModal")
      .findWhere((node) => node.prop("data-test-id") === "postForm");

    submitBtn.simulate("submit", {});
  });

  it("User should be able to submit the form without error", () => {
    expect(handleSubmitFn).toHaveBeenCalled();
  });
});

describe("User should be able to submit post form", () => {
  let wrapper: ShallowWrapper;

  let postPostMock = postListMock();

  it("I am user loading posts list", () => {
    wrapper = shallow(<ListPosts />);
  });

  it("User click on Edit post button", () => {
    postPostMock.mockRestore();
    postPostMock = postListMock();

    const editBtn = wrapper
      .findWhere((node) => node.prop("data-test-id") === "edit-post")
      .at(0);

    editBtn.simulate("click");
  });

  it("Edit post dialog should open without errors", () => {
    const editPostDialog = wrapper
      .find(CreatePostModal)
      .dive()
      .findWhere((node) => node.prop("data-test-id") === "postModal")
      .findWhere((node) => node.prop("data-test-id") === "postModalContent");

    expect(editPostDialog.exists()).toBe(true);
  });

  it("User submit the post form", async () => {
    const editPostDialog = wrapper
      .find(CreatePostModal)
      .dive()
      .findWhere((node) => node.prop("data-test-id") === "postModal")
      .findWhere((node) => node.prop("data-test-id") === "postForm");

    await editPostDialog.simulate("submit", {
      target: { title: { value: "" }, description: { value: "" } },
      preventDefault: jest.fn(),
    });
  });

  it("Post dialog should be closed without errors", () => {
    const editPostDialog = wrapper
      .find(CreatePostModal)
      .dive()
      .findWhere((node) => node.prop("data-test-id") === "postModal");

    expect(editPostDialog.prop("open")).toBe(false);
  });

  it("Post Api call should made", () => {
    expect(postPostMock).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts",
      {
        body: JSON.stringify({ title: "", description: "" }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
  });
});

describe("User should be able to delete post", () => {
  let wrapper: ShallowWrapper;

  let postPostMock = postListMock();

  it("I am user loading posts list", () => {
    wrapper = shallow(<ListPosts />);
  });

  it("User click on delete post", () => {
    postPostMock.mockRestore();
    postPostMock = postListMock();

    const deleteBtn = wrapper
      .findWhere((node) => node.prop("data-test-id") === "delete-post")
      .at(0);

    deleteBtn.simulate("click");
  });

  it("Delete post dialog should open without errors", () => {
    const editPostDialog = wrapper
      .find(TableModal)
      .dive()
      .findWhere((node) => node.prop("data-test-id") === "deleteTitle");

    console.log("editPostDialog.debug() :>> ", editPostDialog.debug());

    expect(editPostDialog.exists()).toBe(true);
  });

  it("Post Api call should made", () => {
    expect(postPostMock).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        method: "DELETE",
      }
    );
  });
});
