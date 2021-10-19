import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import FeatureItem from "./feature-item.comp";

jest.mock("utils/config.util");

const renderFeatureItem = () => {
  const featureFlag = {
    id: 123,
    name: "External Payment & Services",
    description: "Short description",
    enabled: false
  };
  const notificationApi = {
    success: () => {
      //
    },
    error: () => {
      //
    }
  };
  return render(<FeatureItem featureFlag={featureFlag} notificationApi={notificationApi} />);
};

describe("feature-item.comp.js", () => {
  test("feature flag loads and renders the feature flag information", () => {
    const { getByText, getByRole } = renderFeatureItem();

    expect(getByText("External Payment & Services")).toBeInTheDocument();
    expect(getByText("Short description")).toBeInTheDocument();
    expect(getByRole("switch")).toBeInTheDocument();
    jest.resetAllMocks();
  });
});
