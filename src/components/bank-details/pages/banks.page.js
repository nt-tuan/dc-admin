import { Redirect } from "react-router-dom";
import { useGetBanks } from "../services/use-query-banks";
import { getBankDetailPath } from "../utils/path.util";

const Banks = () => {
  const { data } = useGetBanks();
  if (data == null) return <></>;
  return <Redirect to={getBankDetailPath(data[0].id)} />;
};

export default Banks;
