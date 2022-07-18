import {
  useCreateSegment,
  useCreateProductFamily,
  useCreateProductClass,
  useCreateProductBrick
} from "./use-create-entity";
import { useMutation } from "react-query";
import { renderHook } from "@testing-library/react-hooks";

jest.mock("react-query");

test("useCreateSegment should work", () => {
  renderHook(() => useCreateSegment());
  expect(useMutation).toBeCalled();
});

test("useCreateProductFamily should work", () => {
  renderHook(() =>
    useCreateProductFamily({
      onSuccess: jest.fn()
    })
  );
  expect(useMutation).toBeCalled();
});

test("useCreateProductClass should work", () => {
  renderHook(() =>
    useCreateProductClass({
      onSuccess: jest.fn()
    })
  );
  expect(useMutation).toBeCalled();
});

test("useCreateProductBrick should work", () => {
  renderHook(() =>
    useCreateProductBrick({
      onSuccess: jest.fn()
    })
  );
  expect(useMutation).toBeCalled();
});
