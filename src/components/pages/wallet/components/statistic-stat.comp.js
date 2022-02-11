import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { toCurrency } from "utils/general.util";

export const StatisticStat = ({ icon, title, value, description }) => {
  return (
    <Card
      title={description}
      sx={{
        color: (theme) => theme.palette.common.white,
        backgroundColor: (theme) => theme.palette.primary.main
      }}
    >
      <CardContent>
        <Stack spacing={2} direction="row" alignItems="center">
          <Box>{icon}</Box>
          <Stack direction="column">
            <Box sx={{ fontSize: "14px" }}>{title}</Box>
            <Box sx={{ fontSize: "24px", fontWeight: "bold" }}>{toCurrency(value)}</Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
