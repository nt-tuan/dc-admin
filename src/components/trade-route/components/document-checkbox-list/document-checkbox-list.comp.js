import { Loader } from "@/components/commons";
import { FormControlLabel, FormGroup, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

export const DocumentCheckboxList = ({
  title,
  isLoading,
  documentTypes,
  defaultDocuments,
  currentDocuments,
  onCheckAll,
  isCheckedAll,
  isIndeterminate,
  onCheckboxClick
}) => {
  if (isLoading) return <Loader />;
  if (documentTypes == null || defaultDocuments == null || currentDocuments == null) return <></>;
  return (
    <Box
      style={{
        width: "400px",
        border: "solid 1px #f1f1f1",
        borderRadius: "5px",
        padding: "20px"
      }}
    >
      {title && (
        <Typography mb={1} fontWeight="bolder">
          {title}
        </Typography>
      )}
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              onChange={onCheckAll}
              checked={isCheckedAll}
              indeterminate={!isCheckedAll && isIndeterminate}
              disabled={documentTypes?.length === 0}
            />
          }
          label="Select all"
        />
      </FormGroup>

      <hr />
      <FormGroup>
        {documentTypes?.map((opt) => (
          <FormControlLabel
            key={opt.id}
            control={
              <Checkbox
                onChange={(e) => onCheckboxClick(e, opt.id)}
                value={opt.id}
                disabled={defaultDocuments?.some((d) => d.id === opt.id)}
                checked={currentDocuments?.some((item) => item.id === opt.id)}
              />
            }
            label={opt.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
