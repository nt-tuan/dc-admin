import { renderHook } from "@testing-library/react-hooks";
import { useGAVerifier } from "./use-ga-verifier";

jest.mock("./use-verifier");

test("useGAVerifier should work", async () => {
  const onError = jest.fn();
  const onSuccess = jest.fn();
  const onReady = jest.fn();
  const validateFn = async () => true;
  const requestVerifyFn = async () => true;

  const { result } = renderHook(() =>
    useGAVerifier({ onError, onSuccess, onReady, validateFn, requestVerifyFn, isSetup: false })
  );
  expect(result.current.isVerifying).toEqual(false);
});
