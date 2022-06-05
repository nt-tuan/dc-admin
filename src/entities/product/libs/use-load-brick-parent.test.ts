import { renderHook } from "@testing-library/react-hooks";
import useLoadBrickParent from "./use-load-brick-parent";
import { useGetFamily, useGetProductClass } from "./use-get-entity";

jest.mock("./use-get-entity");

describe("useLoadBrickParent should work", () => {
  const testCases = [
    {
      name: "loading class",
      code: "my-code",
      classQuery: {
        isLoading: true
      },
      familyQuery: {},
      expectFn: (current) => expect(current.isLoading).toEqual(true)
    },
    {
      name: "loading family",
      code: "my-code",
      classQuery: {
        isLoading: false
      },
      familyQuery: {
        isLoading: true
      },
      expectFn: (current) => expect(current.isLoading).toEqual(true)
    },
    {
      name: "loading finish",
      code: "my-code",
      classQuery: {
        isLoading: false
      },
      familyQuery: {
        isLoading: false
      },
      expectFn: (current) => expect(current.isLoading).toEqual(false)
    },
    {
      name: "class code",
      classQuery: {
        isLoading: false
      },
      familyQuery: {
        isLoading: true
      },
      expectFn: (current) => expect(current.classCode).toEqual("")
    },
    {
      name: "family code and segment code",
      classQuery: {
        isLoading: false
      },
      familyQuery: {
        isLoading: true,
        data: {
          code: "family-code",
          segmentCode: "segment-code"
        }
      },
      expectFn: (current) => {
        expect(current.familyCode).toEqual("family-code");
        expect(current.segmentCode).toEqual("segment-code");
      }
    }
  ];
  for (const testCase of testCases) {
    test(testCase.name, () => {
      (useGetFamily as jest.Mock).mockReturnValue(testCase.familyQuery);
      (useGetProductClass as jest.Mock).mockReturnValue(testCase.classQuery);
      const { result } = renderHook(() => useLoadBrickParent(testCase.code));
      testCase.expectFn(result.current);
    });
  }
});
