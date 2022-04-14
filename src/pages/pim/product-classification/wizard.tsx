import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";
import { Loader } from "@/components/commons";
import { getDCDataLoaders } from "@/entities/product/libs/tree-node";
import { useGetDCSegments } from "@/entities/product/libs/use-get-segments";
import {
  ProductClassificationProvider,
  ProductClassificationTable
} from "@/entities/product/ui/product-classification";
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
const Wizard = () => {
  const { data: segments, isLoading } = useGetDCSegments();
  if (isLoading) return <Loader />;
  if (segments == null) return <Redirect to={pimRoutePaths.PRODUCT_CLASSFICATION} />;
  return (
    <PageContentLayout
      title="Create Product Wizard"
      parentPage={pimRoutePaths.PRODUCT_CLASSFICATION}
    >
      <ProductClassificationProvider segments={segments} loaders={getDCDataLoaders()}>
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
