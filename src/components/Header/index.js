import React from "react";
import PropTypes from "prop-types";

import { Box, Heading, Button } from "grommet";
import { User } from "grommet-icons";

function Header(props) {
  return (
    <Box
      gridArea="header"
      background={{ color: "brand" }}
      pad="small"
      elevation="small"
      justify="between"
      direction="row"
      align="center"
      flex={false}
    >
      <Button
        plain
        label={
          <Heading level={2} margin="none">
            <strong>M-Life</strong>
          </Heading>
        }
        onClick={() => props.onClick()}
      />

      <User color="white" size="large" />
    </Box>
  );
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired
};
Header.defaultProps = {
  onClick: () => {}
};

export default Header;
