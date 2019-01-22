/**
 *
 * SurveyEdit
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { Add, Close, Trash, StatusGood, FormClose } from "grommet-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import MyDiagram from "./MyDiagram";
import StyledForm from "components/StyledForm";
import FormErrorText from "components/FormErrorText";
import {
  Box,
  Button,
  Tab,
  Tabs,
  Text,
  TextInput,
  TextArea,
  Grid,
  FormField,
  Heading,
  Layer,
  CheckBox,
  Anchor
} from "grommet";

import {
  toggleState,
  updateDetails,
  fetchQuestions,
  updatePlatforms,
  deleteQuestion,
  addQuestion,
  uploadAttachment,
  updateQuestion,
  getBranchingData
} from "../../state/actions";

/* eslint-disable react/prefer-stateless-function */
export class SurveyEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      select: "",
      questionType: "open",
      checked: Object.values(this.props.currentSurvey.platforms),
      checkboxes: ["Facebook", "SMS", "WhatsApp"],
      predefAnswers: [],
      file: undefined,
      editQuestion: undefined,
      currentQuestion: undefined,
      notification: undefined,
      showBranch: undefined
    };
  }

  onCheck = ({ target }) => {
    const { checked } = this.state;

    if (target.checked && checked.indexOf(target.id) === -1) {
      checked.push(target.id);
      this.setState({ checked });
    } else {
      this.setState({ checked: checked.filter(item => item !== target.id) });
    }
  };

  onOpen = () =>
    this.setState({
      open: true
    });

  onClose = () => {
    this.setState({
      open: false,
      select: "",
      questionType: "open",
      predefAnswers: []
    });
  };

  notificationClose = () => this.setState({ notification: undefined });

  onSelect = option => {
    this.setState({ select: option });
    this.setState({ questionType: option.value });
  };
  addAnswer = () => {
    const predefAnswers = this.state.predefAnswers.slice();

    predefAnswers.push({ n: "" });
    this.setState({ predefAnswers });
  };
  submitAddQuestion = () => {
    const predefAnswers = this.state.predefAnswers.slice();
    const { question, select, file } = this.state;
    if (select.value !== "file") {
      const data = {
        surveyId: this.props.currentSurvey.id,
        question,
        questionType: select.value,
        predefAnswers
      };

      this.props.addQuestion(data);
    } else {
      let data = new FormData();
      // console.log(file);
      data.append("file", file);
      data.append("text", question);
      data.append("surveyId", this.props.currentSurvey.id);
      console.log("data1", data);
      for (var pair of data.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      this.props.uploadAttachment(data);
    }
    console.log("submitAddquestion");
    this.setState({ open: false });
  };

  submitEditQuestion = () => {
    const predefAnswers = this.state.predefAnswers.slice();
    const { question, select, file, questionId } = this.state;
    if (select.value !== "file") {
      const data = {
        questionId,
        question,
        surveyId: this.props.currentSurvey.id,
        questionType: select.value,
        predefAnswers
      };

      this.props.updateQuestion(data);
    } else {
      let data = new FormData();
      // data.append("file", file);
      // data.append("text", question);
      // data.append("surveyId", this.props.currentSurvey.id);
      // console.log("data1", data);
      // for (var pair of data.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }
      // this.props.uploadAttachment(data);
    }
    // console.log("submitAddquestion");
    this.setState({ editQuestion: false, notification: true });
  };
  onActive = index => this.setState({ index });

  onChangeAnswer = ({ target }) => {
    console.log(this.state.predefAnswers, "predef");
    const predefAnswers = this.state.predefAnswers.slice();
    predefAnswers[target.id] = { value: target.value };
    this.setState({ predefAnswers });
  };
  handleFileUpload = ({ target }) => {
    const file = target.files[0];
    this.setState({ file });
  };
  setQuestion = ({ target }) => {
    this.setState({ question: target.value });
  };
  submitChangeState() {
    const data = {
      surveyId: this.props.currentSurvey.id,
      state: this.props.currentSurvey.state
    };

    this.props.toggleState(data);
    this.setState({ notification: true });
  }

  editQuestion = question => {
    const options = {
      mcq: "Multiple Choice",
      open: "Open question",
      file: "File"
    };

    this.setState({
      editQuestion: true,
      question: question.question,
      select: { label: options[question.type], value: question.type },
      questionType: question.type,
      questionId: question.id
    });
    if (question.answers) {
      this.setState({ predefAnswers: Object.values(question.answers) });
    }

    console.log(this.state, "state");
  };

  editClose = () => {
    this.setState({
      editQuestion: undefined,
      question: undefined,
      select: "",
      predefAnswers: [],
      questionType: "open"
    });
  };

  showBranch = () => {
    const data = { surveyId: this.props.currentSurvey.id };

    this.props.getBranchingData(data);

    this.setState({ showBranch: true });
  };

  closeBranch = () => {
    this.setState({ showBranch: undefined, branchData: undefined });
  };

  renderBranchingView = () => {
    if (this.props.branchData)
      return <MyDiagram data={this.props.branchData} />;
  };
  submitChangeDetails = values => {
    if (this.props.currentSurvey.state === "in_progress") {
      alert("You have to unpublish survey first to make changes");
    } else {
      const data = values;
      data.incentive = parseInt(data.incentive);
      data.surveyId = this.props.currentSurvey.id;
      this.props.updateDetails(data);
      this.setState({ notification: true });
    }
  };
  submitPlatforms = values => {
    const data = values;
    data.surveyId = this.props.currentSurvey.id;
    if (
      JSON.stringify(this.state.checked) !==
      JSON.stringify(this.props.currentSurvey.platforms)
    ) {
      data.platforms = this.state.checked;
    }
    if (values.optInCodes === this.props.currentSurvey.optInCodes) {
      delete data.optInCodes;
    }
    if (values.initCodes === this.props.currentSurvey.initCodes) {
      delete data.initCodes;
    }

    this.props.updatePlatforms(values);
  };
  renderPublishButton() {
    return (
      <Button
        primary
        onClick={() => {
          this.submitChangeState();
        }}
        label={
          this.props.currentSurvey.state === "in_progress"
            ? "Unpublish"
            : "Publish"
        }
      />
    );
  }

  componentWillMount() {
    const data = { surveyId: this.props.currentSurvey.id };
    this.props.fetchQuestions(data);
  }

  renderQuestion(question) {
    let body = (
      <Text margin={{ horizontal: "xsmall", bottom: "xsmall" }}>
        {question.question}
        <Box justify="center" align="end" fill="false">
          <Button
            icon={<Trash />}
            onClick={() =>
              this.props.deleteQuestion({
                questionId: question.id,
                surveyId: this.props.currentSurvey.id
              })
            }
          />
        </Box>
      </Text>
    );
    if (question.type === "mcq") {
      body = (
        <Box gap="small">
          <Text margin={{ horizontal: "xsmall", bottom: "xsmall" }}>
            {question.question}
            <Box justify="center" align="end" fill="false">
              <Button
                icon={<Trash />}
                onClick={() => this.props.deleteQuestion(question.id)}
              />
            </Box>
          </Text>
          {Object.keys(question.answers).map(key => (
            <Text>
              {key}: {question.answers[key].value}
            </Text>
          ))}
        </Box>
      );
    }
    return body;
  }
  renderQuestions() {
    return this.props.questions.map(question => (
      <Box
        gap="medium"
        pad={{ horizontal: "small", vertical: "small" }}
        margin="small"
        round="xxsmall"
        border={{ color: "brand", side: "all" }}
        elevation="small"
        background={{ color: "white" }}
      >
        <Anchor
          key={question.id}
          onClick={() => {
            this.editQuestion(question);
          }}
        >
          {this.renderQuestion(question)}
        </Anchor>
      </Box>
    ));
  }
  renderSurveyDetails() {
    return (
      <Formik
        initialValues={{
          name: this.props.currentSurvey.name,
          description: this.props.currentSurvey.description,
          introString: this.props.currentSurvey.introString,
          completionString: this.props.currentSurvey.completionString,
          incentive: this.props.currentSurvey.incentive,
          currency: this.props.currentSurvey.currency,
          optInCodes: Object.values(this.props.currentSurvey.optInCodes).join(
            ","
          ),
          initCodes: Object.values(this.props.currentSurvey.initCodes).join(",")
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
        onSubmit={this.submitChangeDetails}
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
            <Box align="left" fill justify="start" direction="row">
              <Box width="20%" align="left">
                <Text> Name: </Text>
              </Box>
              <Box align="left" fill>
                <TextArea
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {// eslint-disable-next-line
                errors.name && touched.name && (
                  <FormErrorText gridArea="value" error={errors.name} />
                )}
              </Box>
            </Box>

            <Box align="left" fill justify="start" direction="row">
              <Box width="20%" align="left">
                <Text> Description: </Text>
              </Box>
              <Box align="left" fill>
                <TextArea
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {// eslint-disable-next-line
                errors.description && touched.description && (
                  <FormErrorText gridArea="value" error={errors.description} />
                )}
              </Box>
            </Box>

            <Box align="left" fill justify="start" direction="row">
              <Box width="20%" align="left">
                <Text> Introduction String: </Text>
              </Box>
              <Box align="left" fill>
                <TextArea
                  id="introString"
                  gridArea="value"
                  value={values.introString}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {// eslint-disable-next-line
                errors.introString && touched.introString && (
                  <FormErrorText gridArea="value" error={errors.introString} />
                )}
              </Box>
            </Box>

            <Box align="left" fill justify="start" direction="row">
              <Box width="20%" align="left">
                <Text> Completion String: </Text>
              </Box>
              <Box align="left" fill>
                <TextArea
                  id="completionString"
                  gridArea="value"
                  value={values.completionString}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {// eslint-disable-next-line
                errors.completionString && touched.completionString && (
                  <FormErrorText
                    gridArea="value"
                    error={errors.completionString}
                  />
                )}
              </Box>
            </Box>

            <Box align="left" fill justify="start" direction="row">
              <Box width="20%" align="left">
                <Text> Incentive: </Text>
              </Box>
              <Box align="left" fill>
                <TextInput
                  id="incentive"
                  gridArea="value"
                  value={values.incentive}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {// eslint-disable-next-line
                errors.incentive && touched.incentive && (
                  <FormErrorText gridArea="value" error={errors.incentive} />
                )}
              </Box>
            </Box>

            <Box align="left" fill justify="start" direction="row">
              <Box width="20%" align="left">
                <Text> Currency: </Text>
              </Box>
              <Box align="left" fill>
                <TextInput
                  id="currency"
                  value={values.currency}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {// eslint-disable-next-line
                errors.currency && touched.currency && (
                  <FormErrorText gridArea="value" error={errors.currency} />
                )}
              </Box>
            </Box>

            <Box justify="center" align="center" margin={{ top: "small" }}>
              <Button
                primary
                disabled={!dirty || isSubmitting}
                type="submit"
                label="Submit"
                onClick={handleSubmit}
              />
            </Box>
          </StyledForm>
        )}
      </Formik>
    );
  }
  showNotification() {
    return (
      <Layer
        position="bottom"
        full="horizontal"
        modal={false}
        responsive={false}
        onEsc={this.notificationClose}
      >
        <Box align="start" pad={{ vertical: "medium", horizontal: "small" }}>
          <Box
            align="center"
            direction="row"
            gap="small"
            round="medium"
            elevation="medium"
            pad={{ vertical: "xsmall", horizontal: "small" }}
            background="status-ok"
          >
            <Box align="center" direction="row" gap="xsmall">
              <StatusGood />
              <Text>{this.props.message}</Text>
            </Box>
            <Button
              icon={<FormClose />}
              onClick={this.notificationClose}
              plain
            />
          </Box>
        </Box>
      </Layer>
    );
  }
  render() {
    const {
      index,
      checked,
      checkboxes,
      open,
      select,
      predefAnswers,
      questionType,
      notification,
      editQuestion,
      question,
      showBranch
    } = this.state;
    const options = [
      { label: "Multiple Choice", value: "mcq" },
      { label: "Open question", value: "open" },
      { label: "File", value: "file" }
    ];

    let addOptionButton = "";
    let uploadFileButton = "";
    if (questionType === "mcq") {
      addOptionButton = (
        <Button type="submit" label="Add Option" onClick={this.addAnswer} />
      );
    }
    if (questionType === "file") {
      uploadFileButton = (
        <input
          type="file"
          label="Upload File"
          onChange={this.handleFileUpload}
        />
      );
    }
    return (
      <Box fill>
        <Tabs flex activeIndex={index} onActive={this.onActive}>
          <Tab title="Details">
            <Box
              gap="medium"
              margin={{
                top: "small",
                bottom: "xxsmall",
                left: "large",
                right: "large"
              }}
              justify="start"
              direction="row"
            >
              <Box>
                <Heading level="2">Survey Details</Heading>
              </Box>
              <Box justify="center" align="end">
                {this.renderPublishButton()}
                <Button
                  onClick={() => {
                    this.showBranch();
                  }}
                  label="Branching view"
                />
                {showBranch && (
                  <Layer
                    position="center"
                    full
                    modal
                    onClickOutside={this.closeBranch}
                    onEsc={this.closeBranch}
                  >
                    {this.renderBranchingView()}
                  </Layer>
                )}
              </Box>
            </Box>
            {this.renderSurveyDetails()}
          </Tab>
          <Tab title="Question">
            <Box justify="center" align="end" margin="medium">
              <Button
                primary
                icon={<Add />}
                onClick={this.onOpen}
                label="Add Question"
                path="/"
              />
            </Box>
            {open && (
              <Layer
                position="right"
                full="vertical"
                modal
                onClickOutside={this.onClose}
                onEsc={this.onClose}
              >
                <Box
                  // as="form"
                  fill="vertical"
                  overflow="auto"
                  width="medium"
                  pad="medium"
                  // onSubmit={this.onClose}
                >
                  <Box flex={false} direction="row" justify="between">
                    <Heading level={2} margin="none">
                      Add question
                    </Heading>
                    <Button icon={<Close />} onClick={this.onClose} />
                  </Box>
                  <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                    <FormField label="Question">
                      <TextInput id="question" onChange={this.setQuestion} />
                    </FormField>
                    <FormField label="Select type">
                      <Select
                        options={options}
                        value={select}
                        onSearch={() => {}}
                        onChange={option => this.onSelect(option)}
                      />
                    </FormField>
                    {Object.keys(predefAnswers).map(item => (
                      <FormField label={`Option ${item}`}>
                        <TextInput id={item} onChange={this.onChangeAnswer} />
                      </FormField>
                    ))}

                    {addOptionButton}
                    {uploadFileButton}
                  </Box>
                  <Box flex={false} as="footer" align="start">
                    <Button
                      type="submit"
                      label="Submit"
                      onClick={this.submitAddQuestion}
                      primary
                    />
                  </Box>
                </Box>
              </Layer>
            )}

            {editQuestion && (
              <Layer
                position="center"
                modal
                onClickOutside={this.editClose}
                onEsc={this.editClose}
              >
                <Box
                  fill="vertical"
                  overflow="auto"
                  width="medium"
                  pad="medium"
                >
                  <Box flex={false} direction="row" justify="between">
                    <Heading level={2} margin="none">
                      Edit question
                    </Heading>
                    <Button icon={<Close />} onClick={this.editClose} />
                  </Box>
                  <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                    <FormField label="Question">
                      <TextInput
                        id="editQuestion"
                        onChange={this.setQuestion}
                        value={question}
                      />
                    </FormField>
                    <FormField label="Select type">
                      <Select
                        id="editSelect"
                        options={options}
                        value={select}
                        onChange={option => this.onSelect(option)}
                      />
                    </FormField>
                    {predefAnswers.map((item, index) => (
                      <FormField label={`Option ${index}`}>
                        <TextInput
                          id={index}
                          onChange={this.onChangeAnswer}
                          value={item}
                        />
                      </FormField>
                    ))}

                    {addOptionButton}
                    {uploadFileButton}
                  </Box>
                  <Box flex={false} as="footer" align="start">
                    <Button
                      type="submit"
                      label="Submit"
                      onClick={this.submitEditQuestion}
                      primary
                    />
                  </Box>
                </Box>
              </Layer>
            )}
            <Box justify="center" margin="medium">
              {this.props.questions ? this.renderQuestions() : ""}
            </Box>
          </Tab>
          <Tab title="Platforms">
            <Box align="center" pad="large">
              <Box direction="row" gap="medium">
                {checkboxes.map(item => (
                  <CheckBox
                    key={item}
                    id={item.toLowerCase()}
                    checked={checked.indexOf(item.toLowerCase()) !== -1}
                    label={item}
                    onChange={this.onCheck}
                  />
                ))}
              </Box>
            </Box>
            <Formik onSubmit={this.submitPlatforms}>
              {({
                values,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
              }) => (
                <StyledForm onSubmit={handleSubmit}>
                  <Grid
                    key="surveyEditPlatforms"
                    gap="small"
                    areas={[
                      { name: "label1", start: [0, 0], end: [0, 0] },
                      { name: "value1", start: [1, 0], end: [1, 0] }
                    ]}
                    columns={[["xsmall", "small"], ["large", "flex"]]}
                    rows={["xsmall", "flex"]}
                  >
                    <Text gridArea="label1"> Opt-in Codes: </Text>
                    <Box gridArea="value1" background="white">
                      <TextArea
                        id="optInCodes"
                        value={values.optInCodes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Box>
                    <Text gridArea="label1">Initialize Codes: </Text>
                    <Box>
                      <TextArea
                        id="initCodes"
                        gridArea="value1"
                        value={values.initCodes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Box>
                  </Grid>
                  <Box
                    justify="center"
                    align="center"
                    margin={{ top: "small" }}
                  >
                    <Button
                      primary
                      // disabled={!dirty || isSubmitting}
                      type="submit"
                      label="Submit"
                      onClick={handleSubmit}
                    />
                  </Box>
                </StyledForm>
              )}
            </Formik>
          </Tab>
        </Tabs>
        {notification && this.showNotification()}
      </Box>
    );
  }
}

SurveyEdit.propTypes = {
  currentSurvey: PropTypes.object.isRequired,
  toggleState: PropTypes.func.isRequired,
  updateDetails: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  updatePlatforms: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  uploadAttachment: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  getBranchingData: PropTypes.func.isRequired
};
function mapStateToProps(state) {
  console.log(state, "here");
  return {
    currentSurvey: state.surveys.currentSurvey,
    questions: state.surveys.questions,
    message: state.surveys.message,
    branchData: state.surveys.branchData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleState: data => dispatch(toggleState(data)),
    updateDetails: data => dispatch(updateDetails(data)),
    fetchQuestions: data => dispatch(fetchQuestions(data)),
    updatePlatforms: data => dispatch(updatePlatforms(data)),
    deleteQuestion: data => dispatch(deleteQuestion(data)),
    addQuestion: data => dispatch(addQuestion(data)),
    uploadAttachment: data => dispatch(uploadAttachment(data)),
    updateQuestion: data => dispatch(updateQuestion(data)),
    getBranchingData: data => dispatch(getBranchingData(data))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(SurveyEdit);
