import React, { useState, useContext } from "react";

import AttributeOptions from "./attribute-options";
import LoadingButton from "@mui/lab/LoadingButton";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import OptionsFormEmpty from "./options-form-empty";
import Stack from "@mui/material/Stack";
import { TextField } from "@/components/commons/fields";
import Typography from "@mui/material/Typography";
import { AttributeFormContext } from "@/entities/product/ui/attribute-form-provider";

type InputType = "code" | "title";
const emptyOption = {
  code: "",
  title: ""
};
const OptionInputProps = {
  code: { label: "Options Code" },
  title: { label: "Options Value" }
};

const useAddOption = () => {
  const {
    addOption,
    updateOption,
    selectedOptionCode,
    options,
    changeSelectedOptionCode
  } = useContext(AttributeFormContext);

  const [inputType, setInputType] = useState<InputType>("code");
  const [option, setOption] = React.useState<{ code: string; title: string }>(emptyOption);

  React.useEffect(() => {
    if (!selectedOptionCode) return;
    const selectedOption = options.find((option) => option.code === selectedOptionCode);
    if (!selectedOption) return;
    setOption(selectedOption);
    setInputType("code");
  }, [options, selectedOptionCode]);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOption((current) => ({ ...current, [name]: value }));
  };
  const save = () => {
    if (inputType === "code") {
      setInputType("title");
      return;
    }

    if (selectedOptionCode && inputType === "title") {
      updateOption({ ...option, code: selectedOptionCode });
      reset();
      return;
    }

    addOption(option);
    reset();
  };
  const canSave =
    (inputType === "code" && option.code.length > 0) ||
    (inputType === "title" && option.title.length > 0);
  const reset = () => {
    setOption(emptyOption);
    setInputType("code");
    changeSelectedOptionCode(undefined);
  };

  const disabled =
    option.code != null && selectedOptionCode === option.code && inputType === "code";

  return {
    disabled,
    reset,
    inputType,
    value: option[inputType],
    changeInput,
    canSave,
    save,
    inputProps: OptionInputProps[inputType]
  };
};

const AttributeValueForm = () => {
  const {
    deleteOption,
    isManualSort,
    options,
    changeManualSort,
    isMutating,
    selectedOptionCode,
    changeSelectedOptionCode
  } = useContext(AttributeFormContext);
  const [orderedOptions, setOrderedOptions] = React.useState(options);
  React.useEffect(() => {
    setOrderedOptions(options);
  }, [options]);
  const [isLayoutReady, onSetLayoutReady] = useState<boolean>((options || []).length !== 0);
  const {
    inputType,
    value,
    changeInput,
    save,
    canSave,
    inputProps,
    disabled,
    reset
  } = useAddOption();

  const onSort = () => {
    changeManualSort(!isManualSort);
    let result = Array.from(options);
    result.sort((a, b) => a.title.localeCompare(b.title));
    setOrderedOptions(result);
  };

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
          <LoadingButton
            loading={isMutating}
            onClick={reset}
            size="small"
            variant="contained"
            sx={{ flexShrink: 0 }}
          >
            Add option
          </LoadingButton>
        </Stack>
        <AttributeOptions
          editable={isManualSort}
          options={orderedOptions}
          onChange={setOrderedOptions}
          onDelete={deleteOption}
          selectedOptionCode={selectedOptionCode}
          onOptionClick={changeSelectedOptionCode}
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
            name={inputType}
            placeholder="Ex: Touchscreen"
            value={value}
            onChange={changeInput}
            disabled={disabled}
            {...inputProps}
          />

          <LoadingButton
            loading={isMutating}
            size="small"
            variant="contained"
            onClick={save}
            sx={{
              visibility: canSave ? "visible" : "hidden",
              minHeight: 0
            }}
          >
            Done
          </LoadingButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AttributeValueForm;
