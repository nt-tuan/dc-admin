import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";
import { Loader } from "@/components/commons";
import { getDCDataLoaders, toDictionary } from "@/entities/product/libs/tree-node";
import { useGetDCSegments, useGetSegments } from "@/entities/product/libs/use-get-entity";
import useImportProductClassification from "@/entities/product/libs/use-import-product-classification";
import {
  ProductClassificationProvider,
  ProductClassificationTable,
  useProductClassificationContext
} from "@/entities/product/ui/product-classification";
import {
  getProductBrick,
  getProductClass,
  getProductFamily,
  getSegment
} from "@/services/pim.service";
import { Box, Stack, Typography } from "@mui/material";
import Button from "@mui/lab/LoadingButton";
import { Redirect } from "react-router-dom";
interface Props {
  onSuccess: () => Promise<void>;
}
const AddButton = ({ onSuccess }: Props) => {
  const { nodes, nodeSelection } = useProductClassificationContext();
  const { importData, isCreatable, isLoading } = useImportProductClassification(
    nodes,
    nodeSelection
  );
  const handleClick = () => {
    importData(onSuccess);
  };
  return (
    <Stack alignItems="center">
      <Button
        loading={isLoading}
        disabled={!isCreatable}
        onClick={handleClick}
        fullWidth
        sx={{ maxWidth: 304 }}
        variant="contained"
      >
        Add
      </Button>
    </Stack>
  );
};

const selectionLoaders = {
  Family: async (code: string | undefined) => {
    if (code == null) return [];
    const segment = await getSegment(code);
    return segment?.families ?? [];
  },
  Class: async (code: string | undefined) => {
    if (code == null) return [];
    const family = await getProductFamily(code);
    return family?.classes ?? [];
  },
  Brick: async (code: string | undefined) => {
    if (code == null) return [];
    const cl = await getProductClass(code);
    return cl?.bricks ?? [];
  },
  Attribute: async (code: string | undefined) => {
    if (code == null) return [];
    const brick = await getProductBrick(code);
    return brick?.attributes ?? [];
  }
};

const Wizard = (props: Props) => {
  const { data: dcSegments, isLoading: isDCSegmentLoading } = useGetDCSegments();
  const { data: segment, isLoading: isSegmentLoading } = useGetSegments();
  if (isSegmentLoading || isDCSegmentLoading) return <Loader />;
  if (dcSegments == null || segment == null)
    return <Redirect to={pimRoutePaths.PRODUCT_CLASSFICATION} />;
  return (
    <ProductClassificationProvider
      segments={dcSegments}
      defaulSelection={toDictionary(segment.segments ?? [], undefined, undefined, () => true)}
      loaders={getDCDataLoaders()}
      selectionLoaders={selectionLoaders}
    >
      <Stack height="100%" spacing={3}>
        <Typography variant="body2">
          Add more required components (Segment, Family, Class, Brick, and Attribute), using the
          current GPC schema.
        </Typography>
        <Box height={0} flexGrow={1}>
          <ProductClassificationTable />
        </Box>
        <AddButton {...props} />
      </Stack>
    </ProductClassificationProvider>
  );
};
export default Wizard;
