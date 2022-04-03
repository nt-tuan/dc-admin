import { Box, Chip as MuiChip, Typography } from "@mui/material";
import { styled, experimental_sx as sx } from "@mui/system";
import { DTCTable } from "@/components/commons";

export const ContentWrapper = styled(Box)(
  sx({
    marginTop: 3,
    width: "100%"
  })
);

export const PageContainer = styled(Box)(
  sx({
    padding: 3,
    paddingBottom: 0
  })
);

export const NoUserContainer = styled(Box)(
  sx({ display: "flex", justifyContent: "center", marginBottom: 3 })
);

export const NoUserDescription = styled(Typography)(
  sx({
    fontSize: 14,
    color: "text.primary"
  })
);

export const InviteUserButtonWrapper = styled(Box)(
  sx({
    paddingTop: 3.75,
    textAlign: "center"
  })
);

export const HeaderContainer = styled(Box)(
  sx({
    display: "flex",
    justifyContent: "space-between",
    flexDirection: { xs: "column", sm: "row" }
  })
);

export const HeaderSearchInputContainer = styled(Box)(
  sx({
    paddingTop: { xs: 2, sm: 0 },
    display: "flex",
    flexDirection: { xs: "column", sm: "row" }
  })
);

export const SearchInputWrapper = styled(Box)(
  sx({
    paddingRight: 2,
    width: { md: 400, xs: 300 }
  })
);

export const StyledDTCTable = styled(DTCTable)(
  sx({
    height: 500,
    border: 0,
    "& .MuiDataGrid-iconSeparator": {
      display: "none"
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "grey.100",
      boxShadow: "inset 0px -1px 0px rgba(0, 0, 0, 0.12)"
    }
  })
);

export const DTCTableWrapper = styled(Box)(
  sx({
    height: 500
  })
);

export const StyledChip = styled(MuiChip)(
  sx({
    borderRadius: 16,
    height: 24,
    width: 71,
    color: "secondary.contrastText",
    fontSize: 13,
    "& .MuiChip-label": {
      padding: 0
    }
  })
);

export const LoadingLayout = styled(Box)(
  sx({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200
  })
);
