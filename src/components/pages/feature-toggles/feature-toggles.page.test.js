import React from "react";

import { render, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FeatureTogglesPage from "./feature-toggles.page";
import { FeatureFlagService } from "services/feature-flag.service";

jest.mock("utils/config.util");

afterEach(() => {
  jest.resetAllMocks();
});

const featureFlag = {
  id: 123,
  name: "External Payment & Services",
  description: "Short description",
  enabled: false
};

const mockGetAllFeatureFlags = (fl) => {
  FeatureFlagService.getAllFeatureFlags = jest.fn(() => [fl]);
};

const mockUpdateFeatureFlag = (actualValue) => {
  FeatureFlagService.updateFeatureFlag = jest.fn(actualValue);
};

const caseSwitchToggle = async (firstFeatureName, toggleText, toggleStatusMessage) => {
  const { getByText, getByRole } = render(<FeatureTogglesPage />);

  await waitFor(() => {
    expect(getByText(firstFeatureName)).toBeInTheDocument();
  });

  await act(async () => {
    const button = getByRole("switch");
    fireEvent.click(button);
  });

  await waitFor(() => {
    expect(getByText(toggleText)).toBeInTheDocument();
    expect(getByText(toggleStatusMessage)).toBeInTheDocument();
  });
};

test("No item in the list if server error", async () => {
  const { queryByText } = render(<FeatureTogglesPage />);

  await waitFor(() => {
    expect(queryByText("No Data")).toBeInTheDocument();
  });
});

test("Toggle button change to ON if update success", async () => {
  await act(async () => {
    mockGetAllFeatureFlags(featureFlag);
    mockUpdateFeatureFlag(async () => Promise.resolve(true));
  });

  await caseSwitchToggle(
    featureFlag.name,
    "ON",
    `${featureFlag.name} has been successfully enabled in your Marketplace`
  );
});

test("Toggle button change to OFF if update success", async () => {
  await act(async () => {
    mockGetAllFeatureFlags({ ...featureFlag, enabled: true });
    mockUpdateFeatureFlag(async () => Promise.resolve(false));
  });

  await caseSwitchToggle(
    featureFlag.name,
    "OFF",
    `${featureFlag.name} has been successfully disabled in your Marketplace`
  );
});

test("Toggle button not change if update failed", async () => {
  await act(async () => {
    mockGetAllFeatureFlags(featureFlag);
    mockUpdateFeatureFlag(async () => {
      throw new Error("500");
    });
  });

  await caseSwitchToggle(
    featureFlag.name,
    "OFF",
    `${featureFlag.name} has been failed to enable in your Marketplace`
  );
});
