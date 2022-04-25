import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import { getAttributeType } from "../../libs/mapper";
import IconButton from "@mui/material/IconButton";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { ProductAttribute } from "@/services/pim.service";

const Header = () => {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "grey.100" }}>
        <TableCell>Label</TableCell>
        <TableCell>Attribute Type</TableCell>
        <TableCell>
          <Box pl="9px">Required</Box>
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

interface Props {
  attributes: ProductAttribute[];
  onDelete: (code: string) => void;
}
const AttributeSelect = ({ attributes, onDelete }: Props) => {
  return (
    <Box height="100%" overflow="auto">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Header />
        <TableBody>
          {attributes.map((att) => {
            return (
              <TableRow key={att.code}>
                <TableCell>{att.title}</TableCell>
                <TableCell>{getAttributeType(att)}</TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => onDelete(att.code)}>
                    <DeleteOutline />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};
export default AttributeSelect;
