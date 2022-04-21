import AttributeTypeModal from "./attribute-type-modal";
import AttributesTable from "./attributes-table";
import { Button } from "@mui/material";
import { Loader } from "@/components/commons";
import PageContentLayout from "../page-layout";
import Typography from "@mui/material/Typography";
import { useGetAttributes } from "@/entities/product/libs/use-get-attributes";
import { useState } from "react";

const data = [
  { id: "1", title: "Brand", code: "1" },
  { id: "2", title: "Brand", code: "1" },
  { id: "3", title: "Brand", code: "1" },
  { id: "4", title: "Brand", code: "1" },
  { id: "5", title: "Brand", code: "1" },
  { id: "6", title: "Brand", code: "1" }
];

const Attributes = () => {
  const [modal, setModal] = useState(false);
  // const { data, isLoading } = useGetAttributes();

  // if (isLoading) return <Loader />;
  return (
    <PageContentLayout
      title="Attributes"
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
      <AttributesTable loading={false} dataSource={data} />
      <AttributeTypeModal open={modal} onClose={() => setModal(false)} />
    </PageContentLayout>
  );
};
export default Attributes;
