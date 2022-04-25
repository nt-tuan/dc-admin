import React from "react";
import ArrowDown from "@/components/icons/arrow-down.comp";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import { useGetAttributes } from "../../libs/use-get-entity";
import { ProductAttribute } from "@/services/pim.service";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Loader } from "@/components/commons";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";

interface Props {
  onAdd: (attributes: ProductAttribute[]) => void;
}
interface CheckboxListProps extends Props {
  foundAttributes: ProductAttribute[];
  isLoading?: boolean;
}
const CheckboxList = ({ onAdd, foundAttributes, isLoading }: CheckboxListProps) => {
  const [selectedAttributes, setSelectedAttributes] = React.useState<ProductAttribute[]>([]);
  const checkboxResult = React.useMemo(() => {
    const selectedCodes = new Set(selectedAttributes.map((item) => item.code));
    const all = [...foundAttributes, ...selectedAttributes].reduce(
      (acc, current) => ({
        ...acc,
        [current.code]: { ...current, checked: selectedCodes.has(current.code) }
      }),
      {} as { [key: string]: ProductAttribute & { checked: boolean } }
    );
    return Object.values(all);
  }, [foundAttributes, selectedAttributes]);
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
      <Box height={160} sx={{ overflowY: "scroll", overflowX: "hidden" }}>
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

const AttributeDropdown = ({ onAdd }: Props) => {
  const [searchText, setSearchText] = React.useState<string>("");
  const { data, isLoading } = useGetAttributes();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [foundAttributes, setFoundAttributes] = React.useState<ProductAttribute[]>([]);
  const id = "add-attribute-popover";
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const dataSource = React.useMemo(() => {
    return (
      data?.attributes.map((attribute) => ({
        label: attribute.title,
        attribute
      })) ?? []
    );
  }, [data]);
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: { attribute: ProductAttribute }[] | null
  ) => {
    event.stopPropagation();
    if (value == null) return;
    setFoundAttributes((current) => {
      return [...current, ...value.map((item) => item.attribute)];
    });
  };
  const changeSearchText = (
    e: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    e?.stopPropagation();
    if (reason === "input") setSearchText(value);
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
      >
        <Stack width={448} p={2} spacing={3} alignItems="stretch">
          <Autocomplete
            fullWidth
            multiple
            disablePortal
            id="combo-box-demo"
            value={[]}
            inputValue={searchText}
            onInputChange={changeSearchText}
            options={dataSource}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.attribute.code}>
                  {option.attribute.title}
                </li>
              );
            }}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Search" />}
          />
          <CheckboxList onAdd={onAdd} foundAttributes={foundAttributes} isLoading={isLoading} />
        </Stack>
      </Popover>
    </>
  );
};
export default AttributeDropdown;
