/* eslint-disable */
import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";

import { Segment, ProductFamily, ProductClass, ProductBrick } from "@/services/pim.service";
import FolderIcon from "./folder-icon";
import FolderOpenIcon from "./folder-open-icon";

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/IconButton";
import { Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import { useGetProductClass } from "../../libs/use-get-product-class";

function CloseSquare(props: SvgIconProps) {
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

const StyledTreeItem = styled((props: TreeItemProps) => <TreeItem {...props} />)(({ theme }) => ({
  paddingTop: 9,
  paddingBottom: 9,
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3
    }
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    paddingLeft: 0
    // borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
  }
}));
interface Props {
  segments: Segment[];
}

type NodeType = "Segment" | "Family" | "Class" | "Brick" | "Attribute";
interface INode {
  title: string;
  code: number;
  type: NodeType;
  childrenNodes?: INode[];
}
const TreeNode = ({ title, code, childrenNodes }: INode) => {
  return (
    <>
      <StyledTreeItem
        expandIcon={<FolderIcon />}
        nodeId={code.toString()}
        label={<Typography>{title}</Typography>}
      >
        {childrenNodes?.map((node) => (
          <TreeNode {...node} />
        ))}
      </StyledTreeItem>
    </>
  );
};
const parseBrick = ({ title, code }: ProductBrick) => {
  const node: INode = {
    title: "Brick " + title,
    code,
    type: "Brick"
  };
  return node;
};
const parseClass = ({ title, code, bricks }: ProductClass) => {
  const node: INode = {
    title,
    code,
    childrenNodes: bricks.map(parseBrick),
    type: "Class"
  };
  return node;
};
const parseFamily = ({ title, code, classes }: ProductFamily) => {
  const node: INode = {
    title,
    code,
    childrenNodes: classes.map(parseClass),
    type: "Family"
  };
  return node;
};

const parseSegment = ({ title, code, families }: Segment) => {
  const node: INode = {
    title,
    code,
    type: "Segment",
    childrenNodes: families.map(parseFamily)
  };
  return node;
};

interface NodeRowProps extends INode {
  level: number;
}
const NodeRow = ({ title, code, childrenNodes, type, level }: NodeRowProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const { data: productClass, isLoading } = useGetProductClass(code, {
    enabled: type === "Class" && expanded
  });
  const paddingLeft = type !== "Attribute" ? level : level + 1;
  const expand = () => {
    setExpanded((current) => !current);
  };
  const brickNodes = productClass?.bricks?.map((brick) => ({
    key: brick.code,
    code: brick.code,
    title: brick.title,
    type: "Brick",
    childrenNodes:
      brick?.attributes?.map((item) => ({
        ...item,
        type: "Attribute" as NodeType
      })) ?? []
  }));
  const getButtonIcon = () => {
    if (isLoading) return <CircularProgress />;
    if (expanded) return <FolderOpenIcon />;
    return <FolderIcon />;
  };
  return (
    <>
      <TableRow key={code} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell width={56}>
          <Checkbox />
        </TableCell>
        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={0} paddingLeft={paddingLeft}>
            {type !== "Attribute" && <Button onClick={expand}>{getButtonIcon()}</Button>}
            <Typography variant="body2">
              {type} {title}
            </Typography>
          </Stack>
        </TableCell>
      </TableRow>
      {expanded && childrenNodes?.map((item) => <NodeRow {...item} level={level + 4} />)}
      {expanded &&
        brickNodes?.map((brick) => <NodeRow {...brick} type="Brick" level={level + 4} />)}
    </>
  );
};

export default function SegmentSelect({ segments }: Props) {
  const nodes = segments.map(parseSegment);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={12}>
              <Stack direction="row" alignItems="center">
                <Checkbox />
                <Typography variant="body2">Select all</Typography>
              </Stack>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nodes.map((node) => (
            <NodeRow key={node.code} {...node} level={0} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
