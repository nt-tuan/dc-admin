import {
  getNodesByCode,
  getActualCode,
  getAncestorCodes,
  getDecendantCodes,
  isNodeChecked,
  getDCDataLoaders,
  getLowerEntityType,
  extractLocalCode,
  toDictionary,
  toTreeNodeDictionary,
  findNode
} from "./tree-node";
import { getDCProductClass } from "@/services/pim.service";
jest.mock("@/services/pim.service");

test("getNodesByCode should work", () => {
  expect(
    getNodesByCode(
      {
        "code-1": {
          parentCode: "parent-1",
          code: "code-1"
        },
        "code-2": {
          parentCode: "parent-2"
        },
        "code-3": {
          parentCode: "parent-1",
          code: "code-3"
        }
      } as never,
      "parent-1"
    )
  ).toEqual([
    { parentCode: "parent-1", code: "code-1" },
    { parentCode: "parent-1", code: "code-3" }
  ]);
});

describe("getActualCode should work", () => {
  test("with undefined", () => {
    expect(getActualCode()).toBeUndefined();
  });
  test("with valid 123.456.789", () => {
    expect(getActualCode("123.456.789")).toEqual("789");
  });
});

describe("getAncestorCodes should work", () => {
  test("with valid code", () => {
    expect(getAncestorCodes("123.456.789")).toEqual(["123.456", "123"]);
  });
  test("with parent code undefined", () => {
    expect(getAncestorCodes()).toEqual([]);
  });
});

describe("getDecendantCodes should work", () => {
  test("with valid code", () => {
    expect(
      getDecendantCodes(
        {
          "1": "code-1",
          "1.1": "code-1.1",
          "1.1.2": "code-1.1.2",
          "1.2": "code-1.2",
          "1.2.3": "code-1.2.3"
        } as never,
        "1.2"
      )
    ).toEqual(["1.2", "1.2.3"]);
  });
  test("with undefined", () => {
    expect(getDecendantCodes({} as never)).toEqual([]);
  });
});

describe("isNodeChecked should work", () => {
  const selectedNodes = {
    "1": true,
    "1.1": false,
    "1.2": false,
    "1.3": true
  };
  const testCases = [
    {
      code: "1",
      isSelected: true
    },
    {
      code: "1.1",
      isSelected: false
    },
    {
      code: "1.1.4",
      isSelected: false
    },
    {
      code: "1.2.4",
      isSelected: false
    },
    {
      code: "1.3.4",
      isSelected: true
    }
  ];
  for (const testCase of testCases) {
    test(`when ${testCase.code}`, () => {
      expect(isNodeChecked(selectedNodes, testCase.code)).toEqual(testCase.isSelected);
    });
  }
});

test("getDCDataLoaders should work", () => {
  (getDCProductClass as jest.Mock).mockResolvedValue({ bricks: [] });
  const loader = getDCDataLoaders();
  loader.Brick("my-brick");
  expect(getDCProductClass).toBeCalledWith("my-brick");
});

test("getLowerEntityType should work", () => {
  expect(getLowerEntityType("Family")).toEqual("Class");
});

test("extractLocalCode should work", () => {
  expect(extractLocalCode("1.2.3.4.5")).toEqual({
    attributeCode: "5",
    brickCode: "4",
    classCode: "3",
    familyCode: "2",
    segmentCode: "1"
  });
});

const dataSample = [
  {
    code: "s-1",
    title: "segment-1",
    families: [
      {
        code: "f-1",
        segmentCode: "s-1",
        title: "family-1",
        classes: [
          {
            code: "cl-1",
            familyCode: "f-1",
            title: "class-1",
            bricks: [
              {
                code: "br-1",
                title: "brick-1",
                classCode: "cl-1",
                hsCode: "hs-code",
                attributes: [
                  {
                    code: "att-1",
                    title: "attribute-1",
                    attributeValues: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
test("toDictionary should work", () => {
  expect(toDictionary(dataSample, "Segment", undefined, () => true)).toEqual({
    "s-1": true,
    "s-1.f-1": true,
    "s-1.f-1.cl-1": true,
    "s-1.f-1.cl-1.br-1": true,
    "s-1.f-1.cl-1.br-1.att-1": true
  });
});

test("toTreeNodeDictionary should work", () => {
  const result = toTreeNodeDictionary(dataSample, "Segment", undefined);
  expect(result).toEqual({
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
  });
});

test("findNode should work", () => {
  const nodes = {
    "1000": "1000",
    "1000.10001": "1000.1001",
    "1000.10001.10002": "1000.10001.10002"
  };
  expect(findNode(nodes as never, "10002")).toEqual("1000.10001.10002");
});
