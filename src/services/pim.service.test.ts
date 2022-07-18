import {
  getDCSegments,
  getDCProductClass,
  importPimData,
  getSegments,
  getSegment,
  updateSegment,
  createSegment,
  deleteBulkSegments,
  getProductFamilies,
  getProductFamily,
  updateProductFamily,
  createProductFamily,
  deleteBulkFamilies,
  getProductClasses,
  getProductClass,
  updateProductClass,
  createProductClass,
  deleteBulkClasses,
  getProductBricks,
  getProductBrick,
  createProductBrick,
  updateProductBrick,
  deleteBulkBricks
} from "./pim.service";
import { backendAPI, jobAPI } from "@/utils/httpAPI.util";

jest.mock("@/utils/httpAPI.util");

// #region DC API test
test("getDefaultSegments should work", () => {
  getDCSegments();
  expect(backendAPI.get).toBeCalledWith("/pim/dc-data/product-classification/segments");
});

test("getDCProductClass should work", () => {
  getDCProductClass("dc-class-code");
  expect(backendAPI.get).toBeCalledWith(
    "/pim/dc-data/product-classification/classes/dc-class-code"
  );
});
test("importPimData should work", () => {
  const payload = [
    {
      code: "segment-1",
      title: "segment-title-1",
      families: [{ code: "family-1", title: "family-title-1" }]
    }
  ];
  importPimData(payload);
  expect(jobAPI.post).toBeCalledWith("/pim/jobs/import", payload);
});
// #endregion

// #region Segment API tests
const SEGMENT_PREFIX = "/pim/product-classification/segments";
test("getSegments should work", () => {
  getSegments();
  expect(backendAPI.get).toBeCalledWith(SEGMENT_PREFIX, {
    page: 1,
    size: 100
  });

  getSegments({ page: 0, size: 1000 });
  expect(backendAPI.get).toBeCalledWith(SEGMENT_PREFIX, {
    page: 0,
    size: 1000
  });
});

test("getSegment should work", () => {
  getSegment("my-code");
  expect(backendAPI.get).toBeCalledWith(`${SEGMENT_PREFIX}/my-code`);
});

test("updateSegment should work", () => {
  updateSegment({
    code: "my-code",
    title: "my-title"
  });
  expect(backendAPI.put).toBeCalledWith(`${SEGMENT_PREFIX}/my-code`, {
    code: "my-code",
    title: "my-title"
  });
});

test("createSegment should work", () => {
  createSegment({
    code: "my-code",
    title: "my-title"
  });
  expect(backendAPI.post).toBeCalledWith(SEGMENT_PREFIX, {
    code: "my-code",
    title: "my-title"
  });
});

test("deleteBulkSegments should work", () => {
  deleteBulkSegments(["code-1", "code-2", "code-4"]);
  expect(backendAPI.delete).toBeCalledWith(`${SEGMENT_PREFIX}/bulk`, undefined, [
    "code-1",
    "code-2",
    "code-4"
  ]);
});
// #endregion

// #region Family API tests
const FAMILY_PREFIX = "/pim/product-classification/families";
test("getProductFamilies should work", () => {
  getProductFamilies();
  expect(backendAPI.get).toBeCalledWith(FAMILY_PREFIX, {
    page: 0,
    size: 100
  });
});
test("getProductFamilies should work with params", () => {
  getProductFamilies({ page: 2, size: 1000 });
  expect(backendAPI.get).toBeCalledWith(FAMILY_PREFIX, {
    page: 2,
    size: 1000
  });
});
test("getProductFamily should work", () => {
  getProductFamily("my-code");
  expect(backendAPI.get).toBeCalledWith(`${FAMILY_PREFIX}/my-code`);
});
test("updateProductFamily should work", () => {
  const payload = { code: "my-code", title: "my-title", segmentCode: "my-segment" };
  updateProductFamily(payload);
  expect(backendAPI.put).toBeCalledWith(`${FAMILY_PREFIX}/my-code`, payload);
});
test("createProductFamily should work", () => {
  const payload = { code: "my-code", title: "my-title", segmentCode: "my-segment" };
  createProductFamily(payload);
  expect(backendAPI.post).toBeCalledWith(`${FAMILY_PREFIX}`, payload);
});
test("deleteBulkFamilies should work", () => {
  deleteBulkFamilies(["code-1", "code-2"]);
  expect(backendAPI.delete).toBeCalledWith("/pim/product-classification/families/bulk", undefined, [
    "code-1",
    "code-2"
  ]);
});
// #endregion

// #region Class API tests
const CLASS_PREFIX = "/pim/product-classification/classes";
test("getProductClasses should work", () => {
  getProductClasses();
  expect(backendAPI.get).toBeCalledWith(CLASS_PREFIX, { page: 0, size: 100 });

  getProductClasses({ page: 2, size: 100 });
  expect(backendAPI.get).toBeCalledWith(CLASS_PREFIX, { page: 2, size: 100 });
});
test("getProductClass should work", () => {
  getProductClass("my-code");
  expect(backendAPI.get).toBeCalledWith(`${CLASS_PREFIX}/my-code`);
});
test("createProductClass should work", () => {
  const payload = {
    code: "class-code",
    title: "class-title",
    familyCode: "family-code"
  };
  createProductClass(payload);
  expect(backendAPI.post).toBeCalledWith(CLASS_PREFIX, payload);
});
test("updateProductClass should work", () => {
  const payload = {
    code: "class-code",
    title: "class-title",
    familyCode: "family-code"
  };
  updateProductClass(payload);
  expect(backendAPI.put).toBeCalledWith(`${CLASS_PREFIX}/class-code`, payload);
});
test("deleteBulkClasses should work", () => {
  deleteBulkClasses(["class-1", "class-2"]);
  expect(backendAPI.delete).toBeCalledWith(`${CLASS_PREFIX}/bulk`, undefined, [
    "class-1",
    "class-2"
  ]);
});

// #endregion

// #region Brick API tests
const BRICK_PREFIX = "/pim/product-classification/bricks";
test("getProductBricks should work", () => {
  getProductBricks();
  expect(backendAPI.get).toBeCalledWith(BRICK_PREFIX, { page: 0, size: 100 });

  getProductBricks({ page: 1, size: 101 });
  expect(backendAPI.get).toBeCalledWith(BRICK_PREFIX, { page: 1, size: 101 });
});
test("getProductBricks should work", () => {
  getProductBrick("my-code");
  expect(backendAPI.get).toBeCalledWith(`${BRICK_PREFIX}/my-code`);
});
test("createProductBrick should work", () => {
  const payload = {
    code: "my-code",
    title: "my-title",
    classCode: "my-class",
    hsCode: "my-hs-code",
    attributeCodes: []
  };
  createProductBrick(payload);
  expect(backendAPI.post).toBeCalledWith(`${BRICK_PREFIX}`, payload);
});
test("updateProductBrick should work", () => {
  const payload = {
    code: "my-code",
    title: "my-title",
    classCode: "my-class",
    hsCode: "my-hs-code",
    attributeCodes: []
  };
  updateProductBrick(payload);
  expect(backendAPI.put).toBeCalledWith(`${BRICK_PREFIX}/my-code`, payload);
});
test("deleteBulkBricks should work", () => {
  deleteBulkBricks(["code-1", "code-2"]);
  expect(backendAPI.delete).toBeCalledWith(`${BRICK_PREFIX}/bulk`, undefined, ["code-1", "code-2"]);
});
// #endregion
