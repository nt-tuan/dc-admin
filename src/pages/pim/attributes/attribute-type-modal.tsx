import Button from "@mui/material/Button";
import { DTCModal } from "@/components/commons";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";
import { useHistory } from "react-router-dom";

const TYPE_ENNUM = {
  dropdown: "dropdown",
  textbox: "textbox"
};

const TYPES = [
  // {
  //   value: TYPE_ENNUM.textbox,
  //   label: "Textbox"
  // },
  {
    value: TYPE_ENNUM.dropdown,
    label: "Multi Select Dropdown"
  }
];

const Content = ({ onClose }) => {
  const history = useHistory();
  const [type, setType] = React.useState("");

  const onSubmit = () => {
    history.push(pimRoutePaths.PRODUCT_ATTRIBUTE_CREATION);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Stack spacing={2} alignItems="center" direction="column" width="100%">
        {TYPES.map(({ value, label }) => (
          <Button
            fullWidth
            textAlign="center"
            variant={type === value ? "contained" : "outlined"}
            onClick={() => setType(value)}
          >
            {label}
          </Button>
        ))}
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onSubmit} disabled={!type}>
          Save
        </Button>
      </Stack>
    </Stack>
  );
};
const AttributeTypeModal = ({ open, onClose }) => {
  return (
    <DTCModal
      open={open}
      onClose={onClose}
      title={
        <Typography variant="inherit" textAlign="center">
          Choose Attribute Type
        </Typography>
      }
      content={<Content onClose={onClose} />}
    />
  );
};

export default AttributeTypeModal;
