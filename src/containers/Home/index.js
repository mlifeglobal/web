import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { Grid, Box, Text } from "grommet";

import { fetchSystemData } from "./state/actions";
import { DATA_POINTS } from "./state/constants";

export class Home extends Component {
  componentDidMount() {
    this.props.fetchSystemData();
  }

  renderBox({ title, amount, key }) {
    return (
      <Box
        key={key}
        gap="small"
        pad="small"
        width="medium"
        height="small"
        round="medium"
        justify="center"
        align="center"
        border={{ color: "brand", side: "all" }}
        elevation="small"
        background={{ color: "white" }}
      >
        <Text size="large">{title}</Text>
        <Text size="xlarge" weight="bold">
          {amount}
        </Text>
      </Box>
    );
  }

  render() {
    const { data, loading } = this.props.homeReducer;

    return (
      <Grid
        fill
        justify="center"
        align="center"
        columns={["auto", "auto"]}
        rows={["auto", "auto"]}
      >
        <Helmet title="Home" />
        {loading ? (
          <Text alignSelf="center">Loading....</Text>
        ) : (
          Object.keys(data).map(key =>
            this.renderBox({
              title: DATA_POINTS[key].display,
              amount: data[key],
              key
            })
          )
        )}
      </Grid>
    );
  }
}

Home.propTypes = {
  homeReducer: PropTypes.object.isRequired,
  fetchSystemData: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    homeReducer: state.home
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchSystemData: () => dispatch(fetchSystemData())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
