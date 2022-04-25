import { Loader } from "@/components/commons";
import { useGetSegments } from "@/entities/product/libs/use-get-entity";
import UpdateClassificationTable from "@/entities/product/ui/product-classification/update-product-classification-table";
import EmptyProductClassification from "@/pages/pim/empty-product-classification";
import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import PageContentLayout from "../page-layout";
import HelpOutlined from "@mui/icons-material/HelpOutlined";
import { Link } from "react-router-dom";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";

const ProductClassification = () => {
  const { data, isLoading } = useGetSegments();
  if (isLoading) return <Loader />;
  if (data == null || data?.segments.length === 0) return <EmptyProductClassification />;
  return (
    <PageContentLayout
      title="Product Classification"
      actions={
        <Stack direction="row" spacing={1}>
          <Tooltip title="Add more required components (Segment, Family, Class, Brick, and Attribute), using the current GPC schema.">
            <IconButton>
              <HelpOutlined />
            </IconButton>
          </Tooltip>
          <Link to={pimRoutePaths.PRODUCT_CLASSFICATION_WIZARD}>
            <Button variant="contained">Open Classification Wizard</Button>
          </Link>
        </Stack>
      }
    >
      <Typography mb={3} variant="body2">
        Your selected product classification.
      </Typography>
      <UpdateClassificationTable segments={data.segments} />
    </PageContentLayout>
  );
};
export default ProductClassification;
