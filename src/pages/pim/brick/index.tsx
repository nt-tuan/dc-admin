import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContentLayout from "../page-layout";
import BrickTable from "@/entities/product/ui/brick-table";
import { useGetBricks } from "@/entities/product/libs/use-get-entity";
import { Loader } from "@/components/commons";
import { Link } from "react-router-dom";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";

const Brick = () => {
  const { data, isLoading } = useGetBricks();
  return (
    <PageContentLayout
      title="Bricks"
      loading={isLoading}
      actions={
        <Link to={pimRoutePaths.PRODUCT_BRICK_CREATION}>
          <Button size="large" variant="contained">
            Create Brick
          </Button>
        </Link>
      }
    >
      <Stack spacing={3}>
        <Typography variant="body2">
          The Bricks are the basic building blocks that define the categories of similar products
          and ensures the correct recognition of the product category across the extended supply
          chain, from seller to buyer. Bricks can be further characterized by Brick Attributes and
          attribute values.
        </Typography>
        {isLoading && <Loader />}
        {data && <BrickTable dataSource={data.bricks} />}
      </Stack>
    </PageContentLayout>
  );
};
export default Brick;
