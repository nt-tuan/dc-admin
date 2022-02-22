import { act, fireEvent, render, waitFor } from "@testing-library/react";

import { FeatureFlagService } from "services/feature-flag.service";
import FeatureTogglesPage from "./feature-toggles.page";
import React from "react";
import { useMessage } from "@/hooks/use-message";

jest.mock("utils/config.util");
jest.mock("@/hooks/use-message");
jest.mock("services/feature-flag.service");

const messageError = jest.fn();
const messageSuccess = jest.fn();
beforeEach(() => {
  useMessage.mockReturnValue({
    error: messageError,
    success: messageSuccess
  });
});

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

const caseSwitchToggle = async (firstFeatureName, toggleState, toggleStatusMessage) => {
  const { getByText, getByRole } = render(<FeatureTogglesPage />);

  await waitFor(() => {
    expect(getByText(firstFeatureName)).toBeInTheDocument();
  });

  const button = getByRole("checkbox");

  await act(async () => {
    fireEvent.click(button);
  });

  await waitFor(() => {
    expect(button.checked).toEqual(toggleState);
    if (toggleStatusMessage) expect(messageSuccess).toBeCalledWith(toggleStatusMessage);
  });
};

test("No item in the list if server error", async () => {
  const { queryByText } = render(<FeatureTogglesPage />);

  await waitFor(() => {
    expect(
      queryByText(
        "You can control the specific features in your marketplace by providing appropriate selection."
      )
    ).not.toBeInTheDocument();
  });
});

test("Toggle button change to ON if update success", async () => {
  await act(async () => {
    mockGetAllFeatureFlags(featureFlag);
    mockUpdateFeatureFlag(async () => Promise.resolve(true));
  });

  await caseSwitchToggle(
    featureFlag.name,
    true,
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
    false,
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

  await caseSwitchToggle(featureFlag.name, false);
  expect(messageError).toBeCalledWith(
    `${featureFlag.name} has been failed to enable in your Marketplace`
  );
});
