import {
  deleteBulkAttributes,
  deleteBulkBricks,
  deleteBulkClasses,
  deleteBulkFamilies,
  deleteBulkSegments
} from "@/services/pim.service";
import { renderHook } from "@testing-library/react-hooks";
import { useMutation } from "react-query";
import useDeleteProductClassification, {
  deleteTreeNodes
} from "./use-delete-product-classification";
import { useProductClassificationContext } from "../ui/product-classification";

jest.mock("@/services/pim.service");
jest.mock("react-query");
jest.mock("../ui/product-classification");

const nodeDictionary = {
  "s-1": {
    actualCode: "s-1",
    code: "s-1",
    parentCode: undefined,
    title: "segment-1",
    type: "Segment"
  },
  "s-1.f-1": {
    actualCode: "f-1",
    code: "s-1.f-1",
    parentCode: "s-1",
    title: "family-1",
    type: "Family"
  },
  "s-1.f-1.cl-1": {
    actualCode: "cl-1",
    code: "s-1.f-1.cl-1",
    parentCode: "s-1.f-1",
    title: "class-1",
    type: "Class"
  },
  "s-1.f-1.cl-1.br-1": {
    actualCode: "br-1",
    code: "s-1.f-1.cl-1.br-1",
    parentCode: "s-1.f-1.cl-1",
    title: "brick-1",
    type: "Brick"
  },
  "s-1.f-1.cl-1.br-1.att-1": {
    actualCode: "att-1",
    code: "s-1.f-1.cl-1.br-1.att-1",
    parentCode: "s-1.f-1.cl-1.br-1",
    title: "attribute-1",
    type: "Attribute"
  }
};
const nodeSelection = {
  "s-1": true,
  "s-2": false,
  "s-1.f-1": true,
  "s-1.f-2": false,
  "s-1.f-1.cl-1": true,
  "s-1.f-1.cl-2": false,
  "s-1.f-1.cl-1.br-1": true,
  "s-1.f-1.cl-1.br-2": true,
  "s-1.f-1.cl-1.br-1.att-1": true,
  "s-1.f-1.cl-1.br-1.att-2": true
};
test("deleteTreeNodes.deleteTreeNodes should work", async () => {
  (deleteBulkAttributes as jest.Mock).mockResolvedValue([]);
  (deleteBulkBricks as jest.Mock).mockResolvedValue([]);
  (deleteBulkClasses as jest.Mock).mockResolvedValue([]);
  (deleteBulkFamilies as jest.Mock).mockResolvedValue([]);
  (deleteBulkSegments as jest.Mock).mockResolvedValue([]);
  await deleteTreeNodes(nodeDictionary as never, nodeSelection);
  expect(deleteBulkAttributes).toBeCalledWith(["att-1"]);
  expect(deleteBulkBricks).toBeCalledWith(["br-1"]);
  expect(deleteBulkClasses).toBeCalledWith(["cl-1"]);
  expect(deleteBulkFamilies).toBeCalledWith(["f-1"]);
  expect(deleteBulkSegments).toBeCalledWith(["s-1"]);
});

test("useDeleteProductClassification should work", () => {
  (useMutation as jest.Mock).mockReturnValue({});
  (useProductClassificationContext as jest.Mock).mockReturnValue({
    nodes: {},
    nodeSelection
  });
  const { result } = renderHook(() => useDeleteProductClassification());
  expect(result.current.canDelete).toEqual(true);
  expect(useMutation).toBeCalled();
});
