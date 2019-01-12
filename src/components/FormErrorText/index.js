import React from "react";
import PropTypes from "prop-types";
import { Text } from "grommet";

function FormErrorText(props) {
  const { error, textAlign } = props;
  return (
    <Text color="red" textAlign={textAlign}>
      {error}
    </Text>
  );
}

FormErrorText.propTypes = {
  error: PropTypes.string,
  textAlign: PropTypes.oneOf(["start", "center", "end"])
};

FormErrorText.defaultProps = {
  error: "Error",
  textAlign: "end"
};

export default FormErrorText;
