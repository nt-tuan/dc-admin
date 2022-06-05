import { renderHook } from "@testing-library/react-hooks";
import { useMessage } from "@/hooks/use-message";
import useHandleBulkUploadResponse from "./use-handle-bulk-upload-response";

jest.mock("@/hooks/use-message");
const error = jest.fn();
const success = jest.fn();

beforeEach(() => {
  (useMessage as jest.Mock).mockReturnValue({ error, success });
});

test("useHandleBulkUploadResponse should show error", () => {
  const { result } = renderHook(() => useHandleBulkUploadResponse());
  result.current([
    {
      code: "my-code",
      description: "my-description",
      status: 400
    }
  ]);
  expect(error).toBeCalledWith("my-description");
});

test("useHandleBulkUploadResponse should show success message", () => {
  const { result } = renderHook(() => useHandleBulkUploadResponse());
  result.current([
    {
      code: "my-code",
      description: "my-success-message",
      status: 200
    }
  ]);
  expect(success).toBeCalledWith("Update successfully.");
});
