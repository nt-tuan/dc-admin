import { Loader } from "@/components/commons";
import Button from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { useParams, Link } from "react-router-dom";
import { ActionMenu } from "../components/action-menu.comp";

import { BankDetailView } from "../components/bank-detail-view.comp";
import { Header } from "../components/header.comp";
import { useGetBankById } from "../services/use-query-banks";
import { getBankEditPath } from "../utils/path.util";

const Actions = () => {
  const { id } = useParams();
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <ActionMenu id={id} />
      <Link to={getBankEditPath(id)}>
        <Button variant="contained">Edit</Button>
      </Link>
    </Stack>
  );
};
const Detail = () => {
  const { id } = useParams();
  const { bankData, isLoading } = useGetBankById(id);
  if (isLoading || !bankData) return <Loader />;
  return (
    <Stack>
      <Header header="Bank Details" actions={<Actions />} />
      <BankDetailView bankData={bankData} />
    </Stack>
  );
};
export default Detail;
