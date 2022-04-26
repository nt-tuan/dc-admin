import {
  useGetProductAttributes,
  useGetBrick,
  useGetBricks,
  useGetClasses,
  useGetDCProductClass,
  useGetDCSegments,
  useGetFamilies,
  useGetFamily,
  useGetProductClass,
  useGetSegment,
  useInvalidateBrick,
  useInvalidateGetSegments
} from "./use-get-entity";
import { useQueryClient } from "react-query";
import { renderHook, act } from "@testing-library/react-hooks";
import { queryWrapper } from "@/test/query-wrapper";
import {
  getProductAttributes,
  getProductBrick,
  getProductBricks,
  getProductClasses,
  getProductFamilies,
  getProductFamily,
  getDCProductClass,
  getSegments,
  getDCSegments,
  getSegment,
  getProductClass
} from "@/services/pim.service";
jest.mock("@/services/pim.service");

const renderQuery = (fn: never) => {
  return renderHook(fn, {
    wrapper: queryWrapper
  });
};

const testInvalidateHook = async (hook: unknown) => {
  let result;
  let queryClientResult;
  await act(async () => {
    queryClientResult = renderQuery(useQueryClient as never).result;
  });
  jest.spyOn(queryClientResult.current, "invalidateQueries");
  await act(async () => {
    result = renderQuery(hook as never).result;
  });
  result.current();
  expect(queryClientResult.current.invalidateQueries).toBeCalled();
};

test("useGetAttributes should work", async () => {
  await act(async () => {
    renderQuery(useGetProductAttributes as never);
  });
  expect(getProductAttributes).toBeCalled();
});
test("useGetBrick should work", async () => {
  await act(async () => {
    renderQuery((() => useGetBrick("my-code")) as never);
  });
  expect(getProductBrick).toBeCalled();
});
test("useGetBricks should work", async () => {
  await act(async () => {
    renderQuery(useGetBricks as never);
  });

  expect(getProductBricks).toBeCalled();
});
test("useInvalidateBrick should work", async () => {
  await testInvalidateHook(useInvalidateBrick);
});

test("useGetClasses should work", async () => {
  await act(async () => {
    renderQuery(useGetClasses as never);
  });
  expect(getProductClasses).toBeCalled();
});

test("useGetProductClass should work", async () => {
  await act(async () => {
    renderQuery((() => useGetProductClass("code")) as never);
  });
  expect(getProductClass).toBeCalled();
});

test("useGetFamilies should work", async () => {
  await act(async () => {
    renderQuery(useGetFamilies as never);
  });
  expect(getProductFamilies).toBeCalled();
});

test("useGetFamily should work", async () => {
  await act(async () => {
    renderQuery((() => useGetFamily("familyc-code")) as never);
  });
  expect(getProductFamily).toBeCalled();
});

test("useGetDCProductClass should work", async () => {
  await act(async () => {
    renderQuery((() => useGetDCProductClass("class-code")) as never);
  });
  expect(getDCProductClass).toBeCalled();
});

test("useGetSegments should work", async () => {
  await act(async () => {
    renderQuery(getSegments as never);
  });
  expect(getSegments).toBeCalled();
});

test("useGetSegment should work", async () => {
  await act(async () => {
    renderQuery((() => useGetSegment("segment-code")) as never);
  });
  expect(getSegment).toBeCalled();
});

test("useInvalidateGetSegments should work", async () => {
  await testInvalidateHook(useInvalidateGetSegments);
});

test("useGetDCSegments should work", async () => {
  await act(async () => {
    renderQuery(useGetDCSegments as never);
  });
  expect(getDCSegments).toBeCalled();
});
