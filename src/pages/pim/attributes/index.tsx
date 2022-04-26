import AttributeTypeModal from "./attribute-type-modal";
import { Button } from "@mui/material";
import PageContentLayout from "../page-layout";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useGetProductAttributes } from "@/entities/product/libs/use-get-entity";
import AttributeTable from "@/entities/product/ui/attribute-table";

const Attributes = () => {
  const [modal, setModal] = useState(false);
  const { data, isLoading } = useGetProductAttributes();

  return (
    <PageContentLayout
      title="Attributes"
      loading={isLoading}
      actions={
        <Button variant="contained" onClick={() => setModal(true)}>
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
      <AttributeTypeModal open={modal} onClose={() => setModal(false)} />
    </PageContentLayout>
  );
};
export default Attributes;
