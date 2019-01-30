import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { Helmet } from "react-helmet";

import { Add } from "grommet-icons";
import { push } from "connected-react-router/immutable";
import {
  Box,
  Grid,
  Button,
  Text,
  Grommet,
  Anchor,
  Layer,
  TextArea,
  TextInput
} from "grommet";
import { Formik } from "formik";
import * as Yup from "yup";

import StyledForm from "components/StyledForm";
import FormErrorText from "components/FormErrorText";

import { fetchSurveys, editSurvey, createSurvey } from "../../state/actions";
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
    const { surveys } = this.props.surveysReducer.data;
    const states = {
      in_progress: "In progress",
      uninitiated: "Uninitiated",
      completed: "Completed"
    };
    return surveys.map(survey => (
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
            background="light-1"
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
            background="light-1"
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
            background="light-1"
            gap="xsmall"
          >
            <Text>Status</Text>
            <Text size="large" weight="bold">
              {states[survey.state]}
            </Text>
          </Box>
          <Box
            gridArea="surveyQuestions"
            pad="small"
            elevation="small"
            align="center"
            background="light-1"
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
    const { surveysCount } = this.props.surveysReducer.data;
    const { modalIsOpen } = this.state;
    console.log(this.props.surveysReducer);
    return (
      <Box fill pad="small" gap="medium">
        <Helmet title="Surveys" />
        <Grommet>
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

        {modalIsOpen && (
          <Layer
            position="center"
            modal
            onClickOutside={this.closeModal}
            onEsc={this.closeModal}
          >
            <Box fill="vertical" overflow="auto" width="medium" pad="medium">
              <Helmet title="Create Survey" />
              <Formik
                initialValues={{
                  name: "",
                  description: "",
                  introString: "",
                  completionString: "",
                  incentive: 0,
                  currency: "KES"
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required("Required"),
                  description: Yup.string().required("Required"),
                  introString: Yup.string().required("Required"),
                  completionString: Yup.string().required("Required"),
                  incentive: Yup.number()
                    .positive("Positive number only")
                    .required("Required")
                })}
                onSubmit={this.onSubmitSurvey}
              >
                {({
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit
                }) => (
                  <StyledForm onSubmit={handleSubmit}>
                    <Text margin={{ horizontal: "xsmall" }} textAlign="center">
                      Create a new Survey
                    </Text>
                    <Box
                      fill="horizontal"
                      round="small"
                      border={{ color: "brand", side: "all" }}
                      elevation="small"
                      background={{ color: "white" }}
                      margin={{ top: "medium" }}
                    >
                      <TextInput
                        id="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter survey name"
                        plain
                      />
                    </Box>
                    {// eslint-disable-next-line
                    errors.name && touched.name && (
                      <FormErrorText error={errors.name} />
                    )}
                    <Box
                      fill="horizontal"
                      round="small"
                      border={{ color: "brand", side: "all" }}
                      elevation="small"
                      background={{ color: "white" }}
                      margin={{ top: "small" }}
                    >
                      <TextArea
                        id="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter survey description"
                        plain
                      />
                    </Box>
                    {// eslint-disable-next-line
                    errors.description && touched.description && (
                      <FormErrorText error={errors.description} />
                    )}
                    <Box
                      fill="horizontal"
                      round="small"
                      border={{ color: "brand", side: "all" }}
                      elevation="small"
                      background={{ color: "white" }}
                      margin={{ top: "small" }}
                    >
                      <TextArea
                        id="introString"
                        value={values.introString}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter survey introduction string"
                        plain
                      />
                    </Box>
                    {// eslint-disable-next-line
                    errors.introString && touched.introString && (
                      <FormErrorText error={errors.introString} />
                    )}
                    <Box
                      fill="horizontal"
                      round="small"
                      border={{ color: "brand", side: "all" }}
                      elevation="small"
                      background={{ color: "white" }}
                      margin={{ top: "small" }}
                    >
                      <TextArea
                        id="completionString"
                        value={values.completionString}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter survey completion string"
                        type="completionString"
                        plain
                      />
                    </Box>
                    {// eslint-disable-next-line
                    errors.completionString && touched.completionString && (
                      <FormErrorText error={errors.completionString} />
                    )}
                    <Box
                      fill="horizontal"
                      round="small"
                      border={{ color: "brand", side: "all" }}
                      elevation="small"
                      background={{ color: "white" }}
                      margin={{ top: "small" }}
                    >
                      <TextInput
                        id="incentive"
                        value={values.incentive}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter survey incentive"
                        plain
                        type="number"
                      />
                    </Box>
                    {// eslint-disable-next-line
                    errors.incentive && touched.incentive && (
                      <FormErrorText error={errors.incentive} />
                    )}
                    <Box
                      fill="horizontal"
                      round="small"
                      border={{ color: "brand", side: "all" }}
                      elevation="small"
                      background={{ color: "white" }}
                      margin={{ top: "small" }}
                    >
                      <TextInput
                        id="currency"
                        value={values.currency}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter incentive currency"
                        plain
                      />
                    </Box>
                    {// eslint-disable-next-line
                    errors.currency && touched.currency && (
                      <FormErrorText error={errors.currency} />
                    )}
                    <Box
                      direction="row"
                      fill="horizontal"
                      justify="between"
                      margin={{ top: "small" }}
                      pad={{ horizontal: "xsmall" }}
                    >
                      <Button label="Cancel" onClick={this.closeModal} />
                      <Button
                        primary
                        disabled={!dirty || isSubmitting}
                        label="Submit"
                        onClick={handleSubmit}
                      />
                    </Box>
                    <Box
                      direction="column"
                      margin={{ vertical: "xsmall" }}
                      justify="center"
                    />
                  </StyledForm>
                )}
              </Formik>
            </Box>
          </Layer>
        )}
        {/* <SurveyNew
          title="Create Survey"
          isOpen={this.state.modalIsOpen}
          askToClose={this.closeModal}
          onSubmit={this.onSubmitSurvey}
          onRequestClose={this.handleModalCloseRequest}
        /> */}

        {surveysCount > 0 ? this.renderSurveys() : ""}
        <Box alignSelf="center">
          <Pagination
            prevPageText="prev"
            nextPageText="next"
            firstPageText="first"
            lastPageText="last"
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={surveysCount}
            onChange={this.handlePageChange}
          />
        </Box>
      </Box>
    );
  }
}

SurveyList.propTypes = {
  surveysReducer: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired,
  fetchSurveys: PropTypes.func.isRequired,
  editSurvey: PropTypes.func.isRequired,
  createSurvey: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    surveysReducer: state.surveys
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
