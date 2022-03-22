import { act, fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import OrganizationProfilePage from "./organization-profile.page";
import { getOrganizationName } from "@/services/organization.service";
import { getErrorMaxCharactersMessage } from "@/commons/consts";

jest.mock("@/services/organization.service", () => ({
  getOrganizationName: jest.fn(() => Promise.resolve()),
  updateOrganizationName: jest.fn(() => Promise.resolve())
}));

beforeEach(async () => {
  await act(async () => {
    render(
      <Router history={createMemoryHistory()}>
        <OrganizationProfilePage />
      </Router>
    );
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test("should click save button successfully", async () => {
  getOrganizationName.mockReturnValue({ organizationName: "" });

  const input = screen.getByPlaceholderText("Organization Name");
  const saveButton = screen.getByText("Save");

  act(() => {
    fireEvent.change(input, { target: { value: "test" } });
  });

  await act(async () => {
    fireEvent.click(saveButton);
  });

  const alertSuccessIcon = screen.getByTestId("SuccessOutlinedIcon");
  const alertSuccessText = screen.getByText("Your Organization profile is updated.");

  expect(alertSuccessIcon).toBeInTheDocument();
  expect(alertSuccessText).toBeInTheDocument();
  expect(input).toHaveDisplayValue("test");
});

test("should disabled button when text field empty", async () => {
  getOrganizationName.mockReturnValue({ organizationName: "" });

  const saveButton = screen.getByText("Save");

  expect(saveButton).toBeDisabled();
});

test("should show error message when field value longer more than 30 characters", async () => {
  const textLongerMoreThan30Char = "1234567891012345678910123456789101234";
  const errorMessage = getErrorMaxCharactersMessage("Organization name", 30);

  getOrganizationName.mockReturnValue({ organizationName: "" });

  const input = screen.getByPlaceholderText("Organization Name");
  const saveButton = screen.getByText("Save");

  act(() => {
    fireEvent.change(input, { target: { value: textLongerMoreThan30Char } });
  });

  await act(async () => {
    fireEvent.click(saveButton);
  });

  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});
