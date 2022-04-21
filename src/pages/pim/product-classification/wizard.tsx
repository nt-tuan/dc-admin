import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";
import { Loader } from "@/components/commons";
import { getDCDataLoaders, toDictionary } from "@/entities/product/libs/tree-node";
import { useGetDCSegments, useGetSegments } from "@/entities/product/libs/use-get-segments";
import {
  ProductClassificationProvider,
  ProductClassificationTable
} from "@/entities/product/ui/product-classification";
import {
  getProductBrick,
  getProductClass,
  getProductFamily,
  getSegment
} from "@/services/pim.service";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Redirect } from "react-router-dom";
import PageContentLayout from "../page-layout";

const AddButton = () => {
  return (
    <Stack alignItems="center">
      <Button fullWidth sx={{ maxWidth: 304 }} variant="contained">
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

const Wizard = () => {
  const { data: dcSegments, isLoading: isDCSegmentLoading } = useGetDCSegments();
  const { data: segment, isLoading: isSegmentLoading } = useGetSegments();
  if (isSegmentLoading || isDCSegmentLoading) return <Loader />;
  if (dcSegments == null || segment == null)
    return <Redirect to={pimRoutePaths.PRODUCT_CLASSFICATION} />;
  return (
    <PageContentLayout
      title="Create Product Wizard"
      parentPage={pimRoutePaths.PRODUCT_CLASSFICATION}
    >
      <ProductClassificationProvider
        segments={dcSegments}
        defaulSelection={toDictionary(segment?.segments ?? [], undefined, undefined, () => true)}
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
          <AddButton />
        </Stack>
      </ProductClassificationProvider>
    </PageContentLayout>
  );
};
export default Wizard;
