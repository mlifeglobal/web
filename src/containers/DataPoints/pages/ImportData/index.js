import React from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { Box, Text } from "grommet";

/* eslint-disable react/prefer-stateless-function */
export class ImportData extends React.PureComponent {
  render() {
    return (
      <Box
        fill
        background={{ color: "red" }}
        justify="center"
        align="center"
        gap="xsmall"
        margin="xsmall"
      >
        <Helmet title="Import" />
        <Text size="small">Import Data</Text>
      </Box>
    );
  }
}

ImportData.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
export default connect(
  null,
  mapDispatchToProps
)(ImportData);
