import { screen } from "@testing-library/react";

export const expectTexts = (...texts) => {
  for (const text of texts) {
    expect(screen.getByText(text)).toBeInTheDocument();
  }
};
