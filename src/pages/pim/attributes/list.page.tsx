import { Button } from "@mui/material";
import PageContentLayout from "../page-layout";
import Typography from "@mui/material/Typography";
import { useGetProductAttributes } from "@/entities/product/libs/use-get-entity";
import AttributeTable from "@/entities/product/ui/attribute-table";
import { useHistory } from "react-router-dom";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";

const Attributes = () => {
  const history = useHistory();
  const { data, isLoading } = useGetProductAttributes();

  return (
    <PageContentLayout
      title="Attributes"
      loading={isLoading}
      actions={
        <Button
          variant="contained"
          onClick={() => history.push(pimRoutePaths.PRODUCT_ATTRIBUTE_CREATION)}
        >
          Create Attribute
        </Button>
      }
    >
      <Typography mb={3} variant="body2">
        The Brick attribute is the lowest level of the classification used to more granularly
        characterize products assigned to that Brick. They define all the product details. For
        example, you can specify the mobile phone Brand (iPhone, Samsung, etc.) Storage size (64GB,
        128GB, etc.) Color (White, Grey,etc.).
      </Typography>
      {data && <AttributeTable dataSource={data.attributes} />}
    </PageContentLayout>
  );
};
export default Attributes;
