import React from "react";

export const DTCSection = ({ children, className }) => {
  return (
    <section className={`air__utils__shadow p-3 dtc-br-10 bg-white mb-3 ${className}`}>
      {children}
    </section>
  );
};
