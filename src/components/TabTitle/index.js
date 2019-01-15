import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "grommet";

function TabTitle({ icon, label }) {
  return (
    <Box direction="row" align="center" gap="xsmall" margin="xsmall">
      {icon}
      <Text size="small">
        <strong>{label}</strong>
      </Text>
    </Box>
  );
}

TabTitle.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired
};

export default TabTitle;
