import { Segment } from "@/services/pim.service";
import Button from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ProductClassificationProvider, { useProductClassificationContext } from "./provider";
import ProductClassificationTable from "./product-classification-table";
import useImportProductClassification from "../../libs/use-import-product-classification";
import { useHistory } from "react-router-dom";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";
import { useInvalidateGetSegments } from "../../libs/use-get-segments";
import { getDCDataLoaders } from "../../libs/tree-node";
interface Props {
  segments: Segment[];
}
const CreateButton = () => {
  const history = useHistory();
  const { nodes, nodeSelection } = useProductClassificationContext();
  const { importData, isCreatable, isLoading } = useImportProductClassification(
    nodes,
    nodeSelection
  );
  const invalidate = useInvalidateGetSegments();
  const onSuccess = () => {
    invalidate().finally(() => {
      history.push({
        pathname: pimRoutePaths.PRODUCT_CLASSFICATION
      });
    });
  };
  return (
    <Stack alignItems="center">
      <Button
        loading={isLoading}
        disabled={!isCreatable || isLoading}
        fullWidth
        variant="contained"
        sx={{ maxWidth: 304, mt: 1 }}
        onClick={() => importData(onSuccess)}
      >
        Create
      </Button>
    </Stack>
  );
};
const Importer = ({ segments }: Props) => {
  return (
    <ProductClassificationProvider segments={segments} loaders={getDCDataLoaders()}>
      <Stack height="100%" spacing={3}>
        <Typography variant="body2">
          Browse the below classification wizard and select the required components (Segment,
          Family, Class, Brick, and Attribute), using the current GPC schema.Choose only those that
          are relevant to your Marketplace industry sector. You can always come back to this wizard
          to amend your Product Classification.
        </Typography>
        <Box height={0} flexGrow={1}>
          <ProductClassificationTable />
        </Box>
        <CreateButton />
      </Stack>
    </ProductClassificationProvider>
  );
};
export default Importer;