import { memo } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchInputWrapper } from "../style.comp";

const SearchEmailInput = ({ onChange, value, ...rest }) => {
  return (
    <SearchInputWrapper>
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
    </SearchInputWrapper>
  );
};

export default memo(SearchEmailInput);
