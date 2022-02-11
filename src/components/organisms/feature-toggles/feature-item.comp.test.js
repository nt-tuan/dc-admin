import FeatureItem from "./feature-item.comp";
import React from "react";
import { render } from "@testing-library/react";
import { useSnackbar } from "notistack";

jest.mock("utils/config.util");
jest.mock("notistack");

beforeEach(() => {
  useSnackbar.mockReturnValue({
    enqueueSnackbar: jest.fn()
  });
});

const renderFeatureItem = () => {
  const featureFlag = {
    id: 123,
    name: "External Payment & Services",
    description: "Short description",
    enabled: false
  };
  const setNotification = () => undefined;
  return render(<FeatureItem featureFlag={featureFlag} setNotification={setNotification} />);
};

describe("feature-item.comp.js", () => {
  test("feature flag loads and renders the feature flag information", () => {
    const { getByText, getByRole } = renderFeatureItem();

    expect(getByText("External Payment & Services")).toBeInTheDocument();
    expect(getByText("Short description")).toBeInTheDocument();
    expect(getByRole("checkbox")).toBeInTheDocument();
    jest.resetAllMocks();
  });
});
