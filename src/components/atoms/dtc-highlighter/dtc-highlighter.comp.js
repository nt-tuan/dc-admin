import React from "react";
import PropTypes from "prop-types";
import Highlighter from "react-highlight-words";
import styles from "./style.module.scss";

export const DTCHighlighter = React.memo(({ searchText, value, className }) => {
  return (
    <Highlighter
      highlightStyle={{ padding: 0 }}
      searchWords={[searchText.trim()]}
      autoEscape
      textToHighlight={value.toString()}
      className={className}
      highlightClassName={styles.mark}
    />
  );
});

DTCHighlighter.propTypes = {
  searchText: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};
