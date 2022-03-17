import React from "react";
import { Loader } from "@/components/commons";
import { useGetBanks } from "../services/use-query-banks";
import { BankEmpty } from "./bank-empty.comp";
import Typography from "@mui/material/Typography";
import { getBankDetailPath } from "../utils/path.util";
import { SubLayout } from "@/layouts/auth/sub-layout.comp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { BankPathEnum } from "../bank-path.enum";
import { Link, useRouteMatch } from "react-router-dom";
import Divider from "@mui/material/Divider";

const Header = () => {
  const matchNewBank = useRouteMatch(BankPathEnum.NEW_BANK);
  return (
    <Stack spacing={3} alignItems="flex-start">
      <Typography variant="h5">Banking</Typography>
      {!matchNewBank && (
        <Link to={BankPathEnum.NEW_BANK}>
          <Button variant="contained">Add bank account</Button>
        </Link>
      )}
    </Stack>
  );
};
const Container = ({ children }) => {
  const { data, isLoading } = useGetBanks();
  const matchNewBank = useRouteMatch(BankPathEnum.NEW_BANK);
  const menuData = React.useMemo(() => {
    if (data == null) return;
    const bankMenuItems = data.map((bank) => ({
      title: (
        <Stack spacing={1}>
          <Typography variant="body2">{bank.name}</Typography>
          <Typography variant="body2" color="grey.7">
            {bank.accountNumber}
          </Typography>
        </Stack>
      ),
      key: bank.id,
      url: getBankDetailPath(bank.id)
    }));
    if (matchNewBank) {
      bankMenuItems.push({
        title: "New Bank Account",
        key: "new-bank",
        url: BankPathEnum.NEW_BANK
      });
    }
    if (data.length === 0) return bankMenuItems;
    return [
      {
        key: "#",
        title: "Saved Banks"
      },
      ...bankMenuItems
    ];
  }, [data, matchNewBank]);
  if (isLoading) return <Loader />;
  if (data.length === 0 && !matchNewBank) return <BankEmpty />;
  return (
    <SubLayout
      header={<Header />}
      menuData={menuData}
      divider={<Divider sx={{ borderColor: "grey.300" }} />}
    >
      {children}
    </SubLayout>
  );
};
export const Layout = ({ children }) => {
  return (
    <Box height="100%">
      <Container>{children}</Container>
    </Box>
  );
};
