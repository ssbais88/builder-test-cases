import React from "react";
import { ShallowWrapper, shallow } from "enzyme";
import App from "./App";

describe("User navigates to App", () => {
  let exampleBlockA: ShallowWrapper;
  let instance: App;

  it("I am user loading CRUD App", () => {
    exampleBlockA = shallow(<App />);
  });

  it("I navigates to CRUD App", () => {
    instance = exampleBlockA.instance() as App;
  });

  it("CRUD App will load without errors", () => {
    expect(exampleBlockA).toBeDefined();
  });
});
