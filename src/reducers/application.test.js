import { cleanup } from "@testing-library/react";
import reducer from "reducers/application";

afterEach(cleanup);

describe("Application Reducer", () => {
  it("thows an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});