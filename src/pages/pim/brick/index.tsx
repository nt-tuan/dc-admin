import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContentLayout from "../page-layout";
import BrickTable from "@/entities/product/ui/brick-table";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useGetBricks } from "@/entities/product/libs/use-get-entity";
import { Loader } from "@/components/commons";
import { Link } from "react-router-dom";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";

const Brick = () => {
  const { data, isLoading } = useGetBricks();
  const [filter, setFilter] = React.useState("");
  return (
    <PageContentLayout
      title="Bricks"
      actions={
        <Link to={pimRoutePaths.PRODUCT_BRICK_CREATION}>
          <Button variant="contained">Create Brick</Button>
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
        <TextField
          sx={{ maxWidth: 392 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          placeholder="Search Brick"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {isLoading && <Loader />}
        {data && <BrickTable filter={filter} dataSource={data.bricks} />}
      </Stack>
    </PageContentLayout>
  );
};
export default Brick;
