import { loadable } from "@/utils/loadable.util";
import { BankPathEnum } from "./bank-path.enum";
import { Layout } from "./components/layout.comp";

export const bankRoutes = [
  {
    key: "bank-accounts",
    Component: Layout,
    children: [
      {
        key: BankPathEnum.NEW_BANK,
        path: BankPathEnum.NEW_BANK,
        Component: loadable(() => import("./pages/addition.page"))
      },
      {
        key: BankPathEnum.BANK_HOME,
        path: BankPathEnum.BANK_HOME,
        Component: loadable(() => import("./pages/banks.page"))
      },
      {
        key: BankPathEnum.BANK_DETAIL,
        path: BankPathEnum.BANK_DETAIL,
        Component: loadable(() => import("./pages/detail.page"))
      },
      {
        key: BankPathEnum.BANK_EDIT,
        path: BankPathEnum.BANK_EDIT,
        Component: loadable(() => import("./pages/edition.page"))
      }
    ]
  }
];
