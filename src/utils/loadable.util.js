import React from "react";
export const loadable = (loader) =>
  React.lazy(() =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 500)
    ).then(loader)
  );
