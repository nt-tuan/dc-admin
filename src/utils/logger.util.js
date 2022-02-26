import { MessageContent } from "@/hooks/use-message";
import { globalSnackbarRef } from "@/components/snackbar-provider/snackbar-provider.comp";

export const log = (errMsg) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(errMsg);
  }
};

export const popError = () =>
  globalSnackbarRef.current.enqueueSnackbar(
    <MessageContent
      content="Something went wrong, please press F5 to refresh the page"
      variant="error"
    />
  );
