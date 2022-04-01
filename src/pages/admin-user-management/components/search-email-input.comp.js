import { memo } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchEmailInput = ({ onChange, value, ...rest }) => {
  return (
    <Box paddingRight={2} width={{ md: 400, xs: 300 }}>
      <TextField
        onChange={onChange}
        placeholder="Search email"
        value={value}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 25 }} />
            </InputAdornment>
          )
        }}
        {...rest}
      />
    </Box>
  );
};

export default memo(SearchEmailInput);
