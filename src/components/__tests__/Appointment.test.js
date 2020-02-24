import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";
import Empty from "components/Appointment/empty";
import Show from "components/Appointment/show";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Appointment />);
});
