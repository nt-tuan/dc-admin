import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  filter: string;
  placeholder?: string;
  setFilter: (value: string) => void;
}
const SearchInput = ({ filter, setFilter, placeholder }: Props) => {
  return (
    <TextField
      sx={{ maxWidth: 392 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
      placeholder={placeholder}
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};
export default SearchInput;
