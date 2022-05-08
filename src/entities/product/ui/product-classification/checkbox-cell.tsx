import TableCell from "./table-cell";
import Checkbox from "@mui/material/Checkbox";
import { useProductClassificationContext } from "./provider";
const CheckboxCell = ({ code }: { code: string }) => {
  const { changeCheckbox, isChecked, isDefaultSelection } = useProductClassificationContext();
  const checked = isChecked(code);
  const disabled = isDefaultSelection(code);
  return (
    <TableCell width={20} padding="checkbox">
      <Checkbox
        disabled={disabled}
        checked={checked}
        onChange={(e) => changeCheckbox(code, e.target.checked)}
      />
    </TableCell>
  );
};
export default CheckboxCell;
