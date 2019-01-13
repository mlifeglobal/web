import React from "react";
import PropTypes from "prop-types";

import { Box, Button, Text } from "grommet";

function Sidebar(props) {
  const { activeTopLink, topLinks, bottomLinks, onClick } = props;

  const topLinksNav = topLinks.map(({ id, display, to }) => (
    <Button
      active={id === activeTopLink}
      key={id}
      hoverIndicator
      onClick={() => onClick(id, to)}
    >
      <Text>{display}</Text>
    </Button>
  ));

  const bottomLinksNav = bottomLinks.map(({ id, display, to }) => (
    <Button key={id} hoverIndicator onClick={() => onClick(id, to)}>
      <Text>{display}</Text>
    </Button>
  ));

  return (
    <Box
      basis="small"
      pad="small"
      elevation="xsmall"
      direction="column"
      justify="between"
    >
      <Box gap="xsmall">{topLinksNav}</Box>
      <Box gap="xsmall">{bottomLinksNav}</Box>
    </Box>
  );
}

Sidebar.propTypes = {
  activeTopLink: PropTypes.string,
  topLinks: PropTypes.arrayOf(PropTypes.object),
  bottomLinks: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func
};

export default Sidebar;
