import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { Box, Tabs, Tab } from "grommet";
import { Download, Upload } from "grommet-icons";

import TabTitle from "components/TabTitle";

import ExportData from "./pages/ExportData";
import ImportData from "./pages/ImportData";

import { switchTab, fetchData } from "./state/actions";

export class DataPoints extends React.PureComponent {
  componentDidMount() {
    this.props.fetchData();
  }

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
  switchTab: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    dataPoints: state.dataPoints
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(fetchData()),
    switchTab: (payload = {}) => dispatch(switchTab(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataPoints);
