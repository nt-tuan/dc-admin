import AttributesCreation from "./attribute-creation";
import { Button } from "@mui/material";
import PageContentLayout from "../page-layout";
import Typography from "@mui/material/Typography";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";
import { useCreateAttribute } from "@/entities/product/libs/use-get-attributes";

const Attributes = () => {
  const { mutate, isLoading } = useCreateAttribute();

  const submit = (values) => {
    mutate(values, {
      onSuccess: () => {
        // ref.current.resetForm();
        console.log("create successful");
      }
    });
  };

  return (
    <PageContentLayout
      title="Create Attribute"
      parentPage={pimRoutePaths.PRODUCT_ATTRIBUTES}
      actions={<Button variant="contained">Save</Button>}
    >
      <Typography mb={3} variant="body2">
        General Properties
      </Typography>
      <AttributesCreation onSubmit={submit} isLoading={isLoading} />
    </PageContentLayout>
  );
};
export default Attributes;
