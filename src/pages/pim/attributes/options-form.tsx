import AttributeOptions from "./attribute-options";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import OptionsFormEmpty from "./options-form-empty";
import Stack from "@mui/material/Stack";
import { TextField } from "@/components/commons/fields";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const options = [
  { title: "thuan", value: "thuannc" },
  { title: "thuan1", value: "thuannc1" },
  { title: "thuan2", value: "thuannc2" },
  { title: "thuan3", value: "thuannc3" },
  { title: "thuan4", value: "thuannc4" }
];

const OptionsForm = ({ isEmpty }: { isEmpty: boolean }) => {
  if (isEmpty) return <OptionsFormEmpty />;
  const [sort, setSort] = useState<boolean>(false);

  const onSort = () => {
    setSort((s) => !s);
  };
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Typography variant="h6">Options Value</Typography>
        <Stack direction="row" justifyContent="space-between" mt={2} mb={2}>
          <FormControlLabel
            control={<Checkbox name="sort-options" checked={sort} onChange={() => onSort()} />}
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
        <AttributeOptions editable={sort} options={options} />
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
          />
          <Button size="small" variant="contained">
            Done
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default OptionsForm;
