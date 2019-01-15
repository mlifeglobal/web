import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { Helmet } from "react-helmet";

import { Add } from "grommet-icons";
import { push } from "connected-react-router/immutable";
import { Box, Grid, Button, Text, Grommet, Anchor } from "grommet";

import { fetchSurveys, editSurvey, createSurvey } from "./state/actions";
import SurveyNew from "./SurveyNewModal";
import "./main.css";

export class SurveyList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      activePage: 1
    };
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  };

  onSubmitSurvey = values => {
    this.props.createSurvey(values);
    window.location.reload();
  };

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
    this.props.fetchSurveys({ offset: (pageNumber - 1) * 10, limit: 10 });
  };

  componentWillMount() {
    this.props.fetchSurveys({ offset: 0, limit: 10 });
  }

  editSurvey = survey => {
    this.props.editSurvey(survey);
    this.props.changeRoute("/surveys/edit");
  };

  renderSurveys() {
    return this.props.surveys.data.map(survey => (
      <Anchor
        key={survey.name}
        onClick={() => {
          this.editSurvey(survey);
        }}
      >
        <Grid
          areas={[
            { name: "surveyMain", start: [0, 0], end: [0, 0] },
            { name: "surveyStatus", start: [1, 0], end: [1, 0] },
            { name: "surveyQuestions", start: [2, 0], end: [2, 0] },
            { name: "surveyComp", start: [3, 0], end: [3, 0] }
          ]}
          columns={[
            ["large", "flex"],
            ["xsmall", "flex"],
            ["xsmall", "flex"],
            ["xsmall", "flex"]
          ]}
          rows={["xsmall", "flex"]}
        >
          <Box
            gridArea="surveyMain"
            pad="small"
            elevation="small"
            align="start"
            background="light-2"
            gap="xsmall"
          >
            <Text>Survey</Text>
            <Text size="large" weight="bold">
              {survey.name}
            </Text>
          </Box>
          <Box
            gridArea="surveyComp"
            pad="small"
            elevation="small"
            align="center"
            background="light-2"
            gap="xsmall"
          >
            <Text>Completed</Text>
            <Text size="large" weight="bold">
              {survey.completedCount}
            </Text>
          </Box>
          <Box
            gridArea="surveyStatus"
            pad="small"
            elevation="small"
            align="center"
            background="light-2"
            gap="xsmall"
          >
            <Text>Status</Text>
            <Text size="large" weight="bold">
              {survey.state}
            </Text>
          </Box>
          <Box
            gridArea="surveyQuestions"
            pad="small"
            elevation="small"
            align="center"
            background="light-2"
            gap="xsmall"
          >
            <Text>Questions</Text>
            <Text size="large" weight="bold">
              {survey.state}
            </Text>
          </Box>
        </Grid>
      </Anchor>
    ));
  }
  render() {
    const customTheme = {
      button: {
        primary: {
          color: "#009451"
        }
      }
    };

    return (
      <Box fill pad="small" gap="medium">
        <Helmet title="Surveys" />
        <Grommet theme={customTheme}>
          <Box align="end">
            <Button
              primary
              icon={<Add />}
              onClick={() => this.openModal()}
              label="Create Survey"
              path="/"
            />
          </Box>
        </Grommet>
        <SurveyNew
          title="Create Survey"
          isOpen={this.state.modalIsOpen}
          askToClose={this.closeModal}
          onSubmit={this.onSubmitSurvey}
          onRequestClose={this.handleModalCloseRequest}
        />

        {this.props.surveys.data ? this.renderSurveys() : ""}
        <Box alignSelf="center">
          <Pagination
            prevPageText="prev"
            nextPageText="next"
            firstPageText="first"
            lastPageText="last"
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.props.surveys.surveysCount}
            onChange={this.handlePageChange}
          />
        </Box>
      </Box>
    );
  }
}

SurveyList.propTypes = {
  surveys: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired,
  fetchSurveys: PropTypes.func.isRequired,
  editSurvey: PropTypes.func.isRequired,
  createSurvey: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    surveys: state.surveys
  };
}
function mapDispatchToProps(dispatch) {
  return {
    changeRoute: route => dispatch(push(route)),
    fetchSurveys: data => dispatch(fetchSurveys(data)),
    editSurvey: payload => dispatch(editSurvey(payload)),
    createSurvey: payload => dispatch(createSurvey(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyList);
