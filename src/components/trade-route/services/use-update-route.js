import { RouteConst } from "@/commons/consts";
import { RouteService } from "@/services";
import { useHistory } from "react-router-dom";
import { useMessage } from "@/hooks/use-message";
import { useMutation } from "react-query";

export const useUpdateRoute = (id) => {
  const message = useMessage();
  const history = useHistory();

  const onSuccess = () => {
    message.success("Edit Successfully");
    history.push(RouteConst.TRADE_ROUTES);
  };
  return useMutation((values) => RouteService.edit(id, values), { onSuccess });
};
