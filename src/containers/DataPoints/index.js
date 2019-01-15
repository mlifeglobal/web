import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { Box, Tabs, Tab } from "grommet";
import { Download, Upload } from "grommet-icons";

import TabTitle from "components/TabTitle";

import ExportData from "./pages/ExportData";
import ImportData from "./pages/ImportData";

import { switchTab } from "./state/actions";

/* eslint-disable react/prefer-stateless-function */
export class DataPoints extends React.PureComponent {
  render() {
    const { activeTab } = this.props.dataPoints;
    return (
      <Box fill align="center">
        <Helmet title="Data" />
        <Tabs
          activeIndex={activeTab}
          onActive={tab => this.props.switchTab({ tab })}
        >
          <Tab
            plain
            title={
              <TabTitle icon={<Download color="brand" />} label="Export" />
            }
          />
          <Tab
            plain
            title={<TabTitle icon={<Upload color="brand" />} label="Import" />}
          />
        </Tabs>

        {activeTab ? <ImportData /> : <ExportData />}
      </Box>
    );
  }
}

DataPoints.propTypes = {
  dataPoints: PropTypes.object.isRequired,
  switchTab: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    dataPoints: state.dataPoints
  };
}
function mapDispatchToProps(dispatch) {
  return {
    switchTab: (payload = {}) => dispatch(switchTab(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataPoints);
