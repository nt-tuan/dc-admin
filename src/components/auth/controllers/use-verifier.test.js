import { renderHook, act } from "@testing-library/react-hooks";
import { useVerifier } from "./use-verifier";
import { queryWrapper } from "@/test/query-wrapper";
import { waitFor } from "@testing-library/react";

test("useVerifier should work", async () => {
  const onError = jest.fn();
  const onSuccess = jest.fn();
  const onReady = jest.fn();
  const validateFn = () => true;
  const requestVerifyFn = () => true;
  let result;
  await act(async () => {
    const hookResult = renderHook(
      () =>
        useVerifier({ onError, onSuccess, onReady, validateFn, requestVerifyFn, isSetup: false }),
      { wrapper: queryWrapper }
    );
    result = hookResult.result;
    await waitFor(() => result.current != null);
    result.current.startVerify();
  });

  await waitFor(() => expect(onReady).toBeCalled());
  expect(onReady).toBeCalled();

  await act(async () => {
    result.current.verify();
  });
  await waitFor(() => expect(onSuccess).toBeCalled());
});
