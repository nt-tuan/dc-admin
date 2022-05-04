import { useState, useContext } from "react";

import AttributeOptions from "./attribute-options";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import OptionsFormEmpty from "./options-form-empty";
import Stack from "@mui/material/Stack";
import { TextField } from "@/components/commons/fields";
import Typography from "@mui/material/Typography";
import { AttributeFormContext } from "@/entities/product/ui/attribute-form";

const OptionsForm = () => {
  const {
    addOption,
    deleteOption,
    setOptions,
    isManualSort,
    options,
    changeManualSort,
    saveOptions
  } = useContext(AttributeFormContext);

  const [isLayoutReady, onSetLayoutReady] = useState<boolean>((options || []).length !== 0);
  const [title, changeTitle] = useState<string>("");

  const onSort = () => {
    changeManualSort(!isManualSort);
    let result = Array.from(options);
    result.sort((a, b) => a.title.localeCompare(b.title));
    setOptions(result);
  };

  const onAddOption = () => {
    addOption(title);
    changeTitle("");
  };

  const onChangeOption = (e) => changeTitle(e.target.value);

  if (!isLayoutReady) return <OptionsFormEmpty onSetLayoutReady={() => onSetLayoutReady(true)} />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Typography variant="h6">Options Value</Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={2}>
          <FormControlLabel
            control={
              <Checkbox name="sort-options" checked={!isManualSort} onChange={() => onSort()} />
            }
            label={
              <Typography variant="body2">
                Sort automatically options by alphabetical order
              </Typography>
            }
          />
          <Button onClick={saveOptions} size="small" variant="contained" sx={{ flexShrink: 0 }}>
            Add option
          </Button>
        </Stack>
        <AttributeOptions
          editable={isManualSort}
          options={options}
          onChange={setOptions}
          onDelete={deleteOption}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">Options Settings</Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          mt={2}
        >
          <TextField
            required
            fullWidth
            name="add-options"
            label="Options Value"
            fieldConfig={{}}
            placeholder="Ex: Touchscreen"
            value={title}
            onChange={onChangeOption}
          />

          <Button
            size="small"
            variant="contained"
            onClick={() => onAddOption()}
            sx={{
              visibility: title ? "visible" : "hidden",
              minHeight: 0
            }}
          >
            Done
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default OptionsForm;
