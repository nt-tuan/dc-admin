import { useCallback, useState } from "react";

import AttributeOptions from "./attribute-options";
import { AttributeValue } from "@/services/pim.service";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import OptionsFormEmpty from "./options-form-empty";
import Stack from "@mui/material/Stack";
import { TextField } from "@/components/commons/fields";
import Typography from "@mui/material/Typography";

export interface IProps {
  options: AttributeValue[];
  isManualSort: boolean;
  onChange: (options: AttributeValue[]) => void;
  setManualSort: () => void;
}

const OptionsForm = (props: IProps) => {
  const { onChange, isManualSort, options, setManualSort } = props;

  const [isLayoutReady, onSetLayoutReady] = useState<boolean>((options || []).length !== 0);
  const [option, setOption] = useState<string>("");

  const onSort = () => {
    setManualSort();
    let result = Array.from(options);
    result.sort((a, b) => a.title.localeCompare(b.title));
    onChange(result);
  };

  const onAddOption = () => {
    const uuid = new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
    const newOption = {
      code: `option_${uuid}`,
      title: option
    };
    onChange([...options, newOption]);
    setOption("");
  };

  const onChangeOption = (e) => setOption(e.target.value);

  const onDelete = useCallback(
    (index: number) => {
      let removed = Array.from(options);
      removed.splice(index, 1);
      onChange(removed);
    },
    [options, onChange]
  );

  if (!isLayoutReady) return <OptionsFormEmpty onSetLayoutReady={() => onSetLayoutReady(true)} />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Typography variant="h6">Options Value</Typography>
        <Stack direction="row" justifyContent="space-between" mt={2} mb={2}>
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
          <Button size="small" variant="contained">
            Add option
          </Button>
        </Stack>
        <AttributeOptions
          editable={isManualSort}
          options={options}
          onChange={onChange}
          onDelete={onDelete}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">Options Settings</Typography>
        <Stack direction="row" justifyContent="space-between" spacing={2} mt={2}>
          <TextField
            required={false}
            fullWidth
            name="add-options"
            label="Options Value"
            fieldConfig={{}}
            placeholder="|Ex: Touchscreen"
            value={option}
            onChange={onChangeOption}
          />
          <Button size="small" variant="contained" onClick={() => onAddOption()}>
            Done
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default OptionsForm;
