import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PageContentLayout from "../page-layout";
const EmptyProductClassification = () => {
  return (
    <PageContentLayout title="Product Classification">
      <Typography variant="h6">Create Product Classification</Typography>
      <Typography variant="body2" my={3}>
        Get started on creating the basic building blocks of your Marketplace, the Marketplace
        Product Classification which sets the product hierarchy structure based on the GPC (Global
        Product Classification) schema . This enables you to easily search and classify products
        accurately in your Marketplace.
      </Typography>
      <Link to="/admin/product-classification/creation">
        <Button variant="contained">Start</Button>
      </Link>
    </PageContentLayout>
  );
};
export default EmptyProductClassification;
