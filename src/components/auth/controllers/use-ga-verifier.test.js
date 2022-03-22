import { renderHook } from "@testing-library/react-hooks";
import { useVerifier } from "./use-verifier";
import { useGAVerifier } from "./use-ga-verifier";

jest.mock("./use-verifier");

test("useGAVerifier should work", () => {
  const onError = jest.fn();
  const onSuccess = jest.fn();
  const onReady = jest.fn();
  const validateFn = () => true;
  const requestVerifyFn = () => true;

  renderHook(() =>
    useGAVerifier({ onError, onSuccess, onReady, validateFn, requestVerifyFn, isSetup: false })
  );
  expect(useVerifier).toBeCalledWith({
    onError,
    onSuccess,
    onReady,
    validateFn,
    requestVerifyFn: expect.anything()
  });
});
