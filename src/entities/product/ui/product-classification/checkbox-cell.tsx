import TableCell from "./table-cell";
import Checkbox from "@mui/material/Checkbox";
import { useProductClassificationContext } from "./provider";
const CheckboxCell = ({ code }: { code: string }) => {
  const { changeCheckbox, isChecked } = useProductClassificationContext();
  const checked = isChecked(code);
  return (
    <TableCell width={20}>
      <Checkbox checked={checked} onChange={(e) => changeCheckbox(code, e.target.checked)} />
    </TableCell>
  );
};
export default CheckboxCell;
