import React from "react";
import { Loader } from "@/components/commons";
import { useGetSegments } from "@/entities/product/libs/use-get-entity";
import UpdateClassificationTable from "@/entities/product/ui/product-classification/update-product-classification-table";
import EmptyProductClassification from "@/pages/pim/empty-product-classification";
import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import PageContentLayout from "../page-layout";
import HelpOutlined from "@mui/icons-material/HelpOutlined";
import ProductClassificationDrawer from "@/entities/product/ui/product-classification-drawer";

const ProductClassification = () => {
  const [wizardOpen, setWizardOpen] = React.useState(false);
  const { data, isLoading } = useGetSegments();
  const openWizard = () => {
    setWizardOpen(true);
  };
  if (isLoading || data == null) return <Loader />;
  return (
    <>
      {data.segments.length === 0 ? (
        <EmptyProductClassification onStart={openWizard} />
      ) : (
        <PageContentLayout
          title="Product Classification"
          actions={
            <Stack direction="row" spacing={1}>
              <Tooltip title="Add more required components (Segment, Family, Class, Brick, and Attribute), using the current GPC schema.">
                <IconButton>
                  <HelpOutlined />
                </IconButton>
              </Tooltip>

              <Button variant="contained" onClick={openWizard}>
                Open Classification Wizard
              </Button>
            </Stack>
          }
        >
          <Typography mb={3} variant="body2">
            Your selected product classification.
          </Typography>
          <UpdateClassificationTable segments={data.segments} />
        </PageContentLayout>
      )}
      <ProductClassificationDrawer
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        segments={data.segments}
      />
    </>
  );
};
export default ProductClassification;
