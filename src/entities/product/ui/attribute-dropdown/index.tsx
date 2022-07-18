import ArrowDown from "@/components/icons/arrow-down.comp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { Loader } from "@/components/commons";
import Popover from "@mui/material/Popover";
import { ProductAttribute } from "@/services/pim.service";
import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useGetProductAttributes } from "../../libs/use-get-entity";

interface Props {
  initialAttributes: ProductAttribute[];
  onAdd: (attributes: ProductAttribute[]) => void;
}
interface CheckboxListProps extends Props {
  foundAttributes: ProductAttribute[];
  isLoading?: boolean;
}
const CheckboxList = ({
  onAdd,
  initialAttributes,
  foundAttributes,
  isLoading
}: CheckboxListProps) => {
  const [selectedAttributes, setSelectedAttributes] = React.useState<ProductAttribute[]>(
    initialAttributes
  );
  React.useEffect(() => {
    setSelectedAttributes(initialAttributes);
  }, [initialAttributes]);
  const checkboxResult = React.useMemo(() => {
    const selectedCodes = new Set(selectedAttributes.map((item) => item.code));

    const all = [...initialAttributes, ...foundAttributes, ...selectedAttributes].reduce(
      (acc, current) => ({
        ...acc,
        [current.code]: { ...current, checked: selectedCodes.has(current.code) }
      }),
      {} as { [key: string]: ProductAttribute & { checked: boolean } }
    );
    return Object.values(all);
  }, [foundAttributes, selectedAttributes, initialAttributes]);
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    attribute: ProductAttribute & { checked: boolean }
  ) => {
    event.stopPropagation();
    const isSelected = selectedAttributes.some((current) => current.code === attribute.code);
    if (isSelected) {
      setSelectedAttributes((attributes) =>
        attributes.filter((current) => current.code !== attribute.code)
      );
      return;
    }
    setSelectedAttributes([...selectedAttributes, attribute]);
  };
  const add = () => {
    onAdd(selectedAttributes);
  };
  return (
    <Stack spacing={3}>
      <Box>
        {isLoading && <Loader />}
        {!isLoading && (
          <FormGroup>
            {checkboxResult.map((item) => (
              <FormControlLabel
                key={item.code}
                control={<Checkbox checked={item.checked} />}
                onChange={(event) => handleChange(event, item)}
                label={item.title}
                sx={{ paddingLeft: 1 }}
              />
            ))}
          </FormGroup>
        )}
      </Box>
      <Divider />
      <Stack direction="row" justifyContent="flex-end" spacing={1} alignItems="center">
        {selectedAttributes.length > 0 && (
          <Typography variant="body2">{selectedAttributes.length} Selected Attributes</Typography>
        )}
        <Button
          size="small"
          variant="contained"
          onClick={add}
          disabled={selectedAttributes.length === 0}
        >
          Add
        </Button>
      </Stack>
    </Stack>
  );
};

const AttributeDropdown = ({ onAdd, initialAttributes }: Props) => {
  const [searchText, setSearchText] = React.useState<string>("");
  const { data, isLoading } = useGetProductAttributes();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const id = "add-attribute-popover";
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const foundAttributes = React.useMemo(() => {
    const isMatchAttribute = (attribute: ProductAttribute) => {
      const nornalizedText = searchText.toLowerCase();
      return (
        attribute.code.toLowerCase().includes(nornalizedText) ||
        attribute.title.toLowerCase().includes(nornalizedText)
      );
    };
    return data?.attributes.filter(isMatchAttribute).slice(0, 5) ?? [];
  }, [data, searchText]);

  const changeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleAdd = (attributes: ProductAttribute[]) => {
    onAdd(attributes);
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="contained"
        endIcon={<ArrowDown />}
        size="small"
        sx={{ py: 0.5 }}
        onClick={handleOpen}
      >
        Add Attribute
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        PaperProps={{ sx: { width: 448, px: 2, pt: 2, pb: 3 } }}
      >
        <TextField fullWidth label="Search" value={searchText} onChange={changeSearchText} />
        <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
          <CheckboxList
            initialAttributes={initialAttributes}
            onAdd={handleAdd}
            foundAttributes={foundAttributes}
            isLoading={isLoading}
          />
        </Box>
      </Popover>
    </>
  );
};
export default AttributeDropdown;
