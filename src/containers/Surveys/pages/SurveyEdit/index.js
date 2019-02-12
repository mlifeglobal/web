/**
 *
 * SurveyEdit
 *
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  Add,
  Close,
  Trash,
  StatusGood,
  FormClose,
  FormUp,
  FormDown,
  Attachment
} from "grommet-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import MyDiagram from "./MyDiagram";
import StyledForm from "components/StyledForm";
import { push } from "connected-react-router";
import FormErrorText from "components/FormErrorText";
import {
  Box,
  Button,
  Tab,
  Tabs,
  Text,
  TextInput,
  TextArea,
  FormField,
  Heading,
  Layer,
  CheckBox,
  Anchor,
  Form,
  Image
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
  getBranchingData,
  setBranch,
  changeOrder,
  deleteSurvey
} from "../../state/actions";

export class SurveyEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      select: "",
      questionType: "",
      checked: Object.values(this.props.currentSurvey.platforms),
      initCodes: this.props.currentSurvey.initCodes.join(","),
      optInCodes: this.props.currentSurvey.optInCodes.join(","),
      checkboxes: ["Facebook", "SMS", "WhatsApp"],
      predefAnswers: [],
      file: undefined,
      editQuestion: undefined,
      currentQuestion: undefined,
      notification: undefined,
      showBranch: undefined,
      attachmentModal: undefined,
      branchModal: false,
      answerType: { label: "Single", value: "single" }
    };
  }

  onCheck = ({ target }) => {
    let checked = this.state.checked.slice();

    if (target.checked && checked.indexOf(target.id) === -1) {
      checked.push(target.id);
      this.setState({ checked });
    } else {
      this.setState({ checked: checked.filter(item => item !== target.id) });
    }
  };

  onOpen = () => {
    if (this.props.currentSurvey.state === "in_progress") {
      alert("You have to unpublish survey first to make changes");
    } else {
      this.setState({
        open: true
      });
    }
  };

  openBranchModal = (selectedPredef, index) => {
    if (this.props.currentSurvey.state === "in_progress") {
      alert("You have to unpublish survey first to make changes");
    } else {
      let select = [];
      let skipQuestions = selectedPredef.skipQuestions;
      let branchingOptions = [];
      index++;
      let questions =
        index === this.props.questions.length
          ? []
          : this.props.questions.slice(index);
      questions.forEach(question => {
        index++;
        if (skipQuestions.includes(question.id)) {
          select.push({
            label: "Q" + index + ":" + question.question,
            value: question.id
          });
        } else {
          branchingOptions.push({
            label: "Q" + index + ":" + question.question,
            value: question.id
          });
        }
      });
      this.setState({
        branchModal: true,
        selectedPredef,
        branchingOptions,
        select
      });
    }
  };

  closeBranchModal = () => {
    this.setState({
      branchModal: false,
      select: ""
    });
  };

  submitSetBranch = () => {
    const { selectedPredef, select } = this.state;

    const data = {
      predefinedAnswerId: selectedPredef.id,
      questions: select,
      surveyId: this.props.currentSurvey.id
    };
    this.props.setBranch(data);
    this.setState({ notification: true, branchModal: false, select: "" });
  };
  onClose = () => {
    this.setState({
      open: false,
      select: "",
      questionType: "",
      predefAnswers: []
    });
  };

  notificationClose = () =>
    this.setState({ notification: undefined, message: undefined });

  onSelect = option => {
    this.setState({ select: option });
    this.setState({ questionType: option.value });
  };

  onSelectAnswer = answerType => {
    this.setState({ answerType });
  };
  addAnswer = () => {
    const predefAnswers = this.state.predefAnswers.slice();

    predefAnswers.push({ n: "" });
    this.setState({ predefAnswers });
  };
  submitAddQuestion = () => {
    const predefAnswers = this.state.predefAnswers.slice();
    const { question, select, file, answerType } = this.state;
    if (!file) {
      const data = {
        surveyId: this.props.currentSurvey.id,
        question,
        questionType: select.value,
        predefAnswers,
        answerType: answerType.value
      };

      this.props.addQuestion(data);
    } else {
      let data = new FormData();
      data.append("file", file);
      data.append("text", question);
      data.append("surveyId", this.props.currentSurvey.id);
      data.append("questionType", select.value);
      data.append("predefAnswers", JSON.stringify(predefAnswers));
      data.append("answerType", answerType.value);
      this.props.uploadAttachment(data);
    }

    this.setState({
      question: "",
      file: undefined,
      open: false,
      notification: true,
      predefAnswers: [],
      select: "",
      answerType: { label: "Single", value: "single" }
    });
  };

  submitEditQuestion = () => {
    const predefAnswers = this.state.predefAnswers.slice();
    const { question, select, questionId, answerType } = this.state;
    if (select.value !== "file") {
      const data = {
        questionId,
        question,
        surveyId: this.props.currentSurvey.id,
        questionType: select.value,
        predefAnswers,
        answerType: answerType.value
      };

      this.props.updateQuestion(data);
    }
    this.setState({
      editQuestion: false,
      notification: true,
      predefAnswers: []
    });
  };

  submitDeleteQuestion = questionId => {
    const data = { questionId, surveyId: this.props.currentSurvey.id };

    this.props.deleteQuestion(data);
    this.setState({ notification: true });
  };

  submitDeleteSurvey = () => {
    const data = { surveyId: this.props.currentSurvey.id };
    this.props.deleteSurvey(data);
    this.props.changeRoute("/surveys");
  };
  changeOrder = (index, action) => {
    const data = { surveyId: this.props.currentSurvey.id };
    if (action === "up") {
      data.questionId1 = this.props.questions[index].id;
      data.questionId2 =
        index === 0
          ? this.props.questions[this.props.questions.length - 1].id
          : this.props.questions[index - 1].id;
    } else {
      data.questionId1 = this.props.questions[index].id;
      data.questionId2 =
        index < this.props.questions.length - 1
          ? this.props.questions[index + 1].id
          : this.props.questions[0].id;
    }
    this.props.changeOrder(data);
    this.setState({ notification: true });
  };

  onActive = index => this.setState({ index });

  onChangeAnswer = ({ target }) => {
    const predefAnswers = this.state.predefAnswers.slice();
    predefAnswers[target.id - 1] = { value: target.value };
    this.setState({ predefAnswers });
  };
  handleFileUpload = ({ target }) => {
    const file = target.files[0];
    this.setState({ file });
  };
  setQuestion = ({ target }) => {
    this.setState({ question: target.value });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };
  submitChangeState() {
    const data = {
      surveyId: this.props.currentSurvey.id,
      state: this.props.currentSurvey.state
    };
    if (this.props.currentSurvey.state !== "in_progress") {
      if (this.props.currentSurvey.questionsCount === 0) {
        alert("Survey is empty. Please add question before publishing.");
      } else if (this.props.currentSurvey.platforms.length === 0) {
        alert("Please set publishing platforms.");
      } else {
        this.props.toggleState(data);
        this.setState({ notification: true });
      }
    } else {
      this.props.toggleState(data);
      this.setState({ notification: true });
    }
  }

  showAttachment = question => {
    this.setState({
      attachmentModal: true,
      attachmentKey: question.attachmentKey
    });
  };
  getSkipData = (question, key) => {
    let questions = this.props.questions;
    let skipQuestions = question.answers[key].skipQuestions;
    let skipVal = [];
    for (var questionId of skipQuestions) {
      skipVal.push(`Q:${questions.map(e => e.id).indexOf(questionId) + 1}`);
    }

    return skipVal.length ? `     (Skips [${skipVal}] )` : "";
  };
  editQuestion = question => {
    if (this.props.currentSurvey.state === "in_progress") {
      alert("You have to unpublish survey first to make changes");
    } else {
      const options = {
        mcq: "Multiple Choice",
        open: "Open question"
      };

      const answerOptions = { multiple: "Multiple", single: "Single" };
      this.setState({
        editQuestion: true,
        question: question.question,
        select: { label: options[question.type], value: question.type },
        answerType: {
          label: answerOptions[question.answerType],
          value: question.answerType
        },
        questionType: question.type,
        questionId: question.id
      });
      if (question.answers) {
        this.setState({ predefAnswers: Object.values(question.answers) });
      }
    }
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
    this.setState({ showBranch: undefined });
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
  submitPlatforms = () => {
    if (this.props.currentSurvey.state === "in_progress") {
      alert("You have to unpublish survey first to make changes");
    } else {
      const data = {};
      data.surveyId = this.props.currentSurvey.id;
      if (
        JSON.stringify(this.state.checked) !==
        JSON.stringify(this.props.currentSurvey.platforms)
      ) {
        data.platforms = this.state.checked;
      }
      const { optInCodes, initCodes } = this.state;
      if (
        optInCodes &&
        optInCodes
          .split(",")
          .sort()
          .toString() !== this.props.currentSurvey.optInCodes.sort().toString()
      ) {
        data.optInCodes = optInCodes;
      }
      if (
        initCodes &&
        initCodes
          .split(",")
          .sort()
          .toString() !== this.props.currentSurvey.initCodes.sort().toString()
      ) {
        data.initCodes = initCodes;
      }
      this.props.updatePlatforms(data);
      this.setState({ notification: true });
    }
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

  renderQuestion(question, index) {
    let image = null;
    if (question.attachmentKey) {
      image = (
        <Button
          icon={<Attachment />}
          onClick={() => this.showAttachment(question)}
        />
      );
    }
    let body = (
      <Box>
        <Box direction="row" fill>
          <Box width="80%" align="start" justify="center">
            <Anchor
              key={question.id}
              color="charcoal"
              onClick={() => {
                this.editQuestion(question);
              }}
            >
              {question.question}
            </Anchor>
          </Box>
          <Box justify="center" align="end" fill="horizontal">
            <Button
              icon={<Trash />}
              onClick={() => this.submitDeleteQuestion(question.id)}
            />
            {image}
          </Box>
        </Box>
      </Box>
    );
    if (question.type === "mcq") {
      body = (
        <Box>
          <Box direction="row" fill="horizontal">
            <Box width="80%" align="start" justify="center">
              <Anchor
                key={question.id}
                color="charcoal"
                onClick={() => {
                  this.editQuestion(question);
                }}
              >
                {question.question}
              </Anchor>
            </Box>
            <Box justify="center" align="end" fill="horizontal">
              <Button
                icon={<Trash />}
                onClick={() => this.submitDeleteQuestion(question.id)}
              />
              {image}
            </Box>
          </Box>
          <Box>
            {Object.keys(question.answers).map(key => (
              <Anchor
                key={question.answers[key].id}
                color="charcoal"
                onClick={() => {
                  this.openBranchModal(question.answers[key], index);
                }}
              >
                {key}: {question.answers[key].value}
                {this.getSkipData(question, key)}
              </Anchor>
            ))}
          </Box>
        </Box>
      );
    }
    return body;
  }
  renderQuestions() {
    return this.props.questions.map((question, index) => (
      <Box direction="row" key={question.id}>
        <Box justify="center">
          <Button
            icon={<FormUp />}
            onClick={() => this.changeOrder(index, "up")}
          />
          <Text margin={{ top: "-15px", bottom: "-10px" }} alignSelf="center">
            Q{index + 1}
          </Text>
          <Button
            icon={<FormDown />}
            onClick={() => this.changeOrder(index, "down")}
          />
        </Box>
        <Box
          gap="medium"
          pad="small"
          margin="small"
          fill="horizontal"
          round="small"
          border={{ color: "brand", side: "all" }}
          elevation="small"
          background={{ color: "white" }}
        >
          {this.renderQuestion(question, index)}
        </Box>
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
          currency: this.props.currentSurvey.currency
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Required"),
          description: Yup.string().required("Required"),
          introString: Yup.string().required("Required"),
          completionString: Yup.string().required("Required"),
          incentive: Yup.number()
            .min(0)
            .required("Required")
        })}
        onSubmit={this.submitChangeDetails}
      >
        {({
          values,
          touched,
          errors,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Box align="start" fill justify="center" direction="row">
              <Box width="20%" justify="center" margin={{ top: "small" }}>
                <Text textAlign="center"> Name: </Text>
              </Box>
              <Box
                align="start"
                fill="horizontal"
                round="small"
                border={{ color: "brand", side: "all" }}
                elevation="small"
                background={{ color: "white" }}
                margin={{ top: "small", right: "small" }}
              >
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

            <Box align="start" fill justify="center" direction="row">
              <Box width="20%" justify="center" margin={{ top: "small" }}>
                <Text textAlign="center"> Description: </Text>
              </Box>
              <Box
                align="start"
                fill="horizontal"
                round="small"
                border={{ color: "brand", side: "all" }}
                elevation="small"
                background={{ color: "white" }}
                margin={{ top: "small", right: "small" }}
              >
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

            <Box align="start" fill justify="start" direction="row">
              <Box width="20%" justify="center" margin={{ top: "small" }}>
                <Text textAlign="center"> Introduction String: </Text>
              </Box>
              <Box
                align="start"
                fill="horizontal"
                round="small"
                border={{ color: "brand", side: "all" }}
                elevation="small"
                background={{ color: "white" }}
                margin={{ top: "small", right: "small" }}
              >
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

            <Box align="start" fill justify="start" direction="row">
              <Box width="20%" justify="center" margin={{ top: "small" }}>
                <Text textAlign="center"> Completion String: </Text>
              </Box>
              <Box
                align="start"
                fill="horizontal"
                round="small"
                border={{ color: "brand", side: "all" }}
                elevation="small"
                background={{ color: "white" }}
                margin={{ top: "small", right: "small" }}
              >
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

            <Box align="start" fill justify="start" direction="row">
              <Box width="20%" justify="center" margin={{ top: "small" }}>
                <Text textAlign="center"> Incentive: </Text>
              </Box>
              <Box
                align="start"
                fill="horizontal"
                round="small"
                border={{ color: "brand", side: "all" }}
                elevation="small"
                background={{ color: "white" }}
                margin={{ top: "small", right: "small" }}
              >
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

            <Box align="start" fill justify="start" direction="row">
              <Box width="20%" justify="center" margin={{ top: "small" }}>
                <Text textAlign="center"> Currency: </Text>
              </Box>
              <Box
                align="start"
                fill="horizontal"
                round="small"
                border={{ color: "brand", side: "all" }}
                elevation="small"
                background={{ color: "white" }}
                margin={{ top: "small", right: "small" }}
              >
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
                disabled={!dirty}
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
            background={
              this.props.requestSucceed ? "status-ok" : "status-error"
            }
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
      showBranch,
      branchModal,
      selectedPredef,
      branchingOptions,
      answerType,
      initCodes,
      optInCodes,
      attachmentModal,
      attachmentKey
    } = this.state;
    const options = [
      { label: "Multiple Choice", value: "mcq" },
      { label: "Open question", value: "open" },
      { label: "File", value: "file" }
    ];

    const answerOptions = [
      { label: "Multiple", value: "multiple" },
      { label: "Single", value: "single" }
    ];
    let addOptionButton = "";
    let showAnswerType = "";
    if (questionType === "mcq") {
      addOptionButton = (
        <Button type="submit" label="Add Option" onClick={this.addAnswer} />
      );
      showAnswerType = (
        <FormField label="Select answer type">
          <Select
            options={answerOptions}
            value={answerType}
            onSearch={() => {}}
            onChange={option => this.onSelectAnswer(option)}
          />
        </FormField>
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

                {showBranch && (
                  <Layer
                    position="center"
                    full
                    modal
                    onClickOutside={this.closeBranch}
                    onEsc={this.closeBranch}
                  >
                    <Box justify="center" align="end" margin="medium">
                      <Button
                        primary
                        color="accent-3"
                        icon={<Close />}
                        onClick={this.closeBranch}
                        label="Close"
                      />
                    </Box>
                    {this.renderBranchingView()}
                  </Layer>
                )}
              </Box>
              <Box justify="center" align="end">
                <Button
                  onClick={() => {
                    this.showBranch();
                  }}
                  label="Branching view"
                />
              </Box>
              <Box justify="center" align="end">
                <Button
                  onClick={() => {
                    this.submitDeleteSurvey();
                  }}
                  label="Delete Survey"
                />
              </Box>
            </Box>
            {this.renderSurveyDetails()}
          </Tab>
          <Tab title="Questions">
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
                  fill="vertical"
                  overflow="auto"
                  width="medium"
                  pad="medium"
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
                    <FormField label="Select question type">
                      <Select
                        options={options}
                        value={select}
                        onSearch={() => {}}
                        onChange={option => this.onSelect(option)}
                      />
                    </FormField>

                    {showAnswerType}

                    {predefAnswers.map((item, index) => (
                      <FormField label={`Option ${index + 1}`}>
                        <TextInput
                          id={index + 1}
                          onChange={this.onChangeAnswer}
                        />
                      </FormField>
                    ))}

                    {addOptionButton}
                    <Box margin={{ top: "small" }}>
                      <input
                        type="file"
                        label="Upload File"
                        onChange={this.handleFileUpload}
                      />
                    </Box>
                  </Box>
                  <Box flex={false} as="footer" align="start">
                    <Button
                      type="submit"
                      disabled={question === undefined}
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
                    <FormField label="Select question type">
                      <Select
                        id="editSelect"
                        options={options}
                        value={select}
                        onChange={option => this.onSelect(option)}
                      />
                    </FormField>

                    <FormField label="Select answer type">
                      <Select
                        options={answerOptions}
                        value={answerType}
                        onSearch={() => {}}
                        onChange={option => this.onSelectAnswer(option)}
                      />
                    </FormField>

                    {predefAnswers.map((item, index) => (
                      <FormField label={`Option ${index + 1}`}>
                        <TextInput
                          id={index + 1}
                          onChange={this.onChangeAnswer}
                          value={item}
                        />
                      </FormField>
                    ))}

                    {addOptionButton}
                    <input
                      type="file"
                      label="Upload File"
                      onChange={this.handleFileUpload}
                    />
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
            {attachmentModal && (
              <Layer
                position="center"
                modal
                onClickOutside={() => {
                  this.setState({
                    attachmentModal: undefined,
                    attachmentKey: undefined
                  });
                }}
                onEsc={() => {
                  this.setState({
                    attachmentModal: undefined,
                    attachmentKey: undefined
                  });
                }}
              >
                <Box height="small" width="small">
                  <Image fit="cover" src={attachmentKey} />
                </Box>
              </Layer>
            )}
            <Box justify="center" margin="medium">
              {this.props.questions ? this.renderQuestions() : ""}
            </Box>
            {branchModal && (
              <Layer
                position="center"
                modal
                onClickOutside={this.closeBranchModal}
                onEsc={this.closeBranchModal}
              >
                <Box margin="medium">
                  <Heading level={2} margin="medium">
                    Select questions to skip for '{selectedPredef.value}'
                  </Heading>
                  <Select
                    closeMenuOnSelect={false}
                    options={branchingOptions}
                    isMulti
                    value={select}
                    onChange={option => this.onSelect(option)}
                  />
                  <Box
                    flex={false}
                    as="footer"
                    align="center"
                    justify="center"
                    margin="medium"
                  >
                    <Button
                      type="submit"
                      label="Submit"
                      onClick={this.submitSetBranch}
                    />
                  </Box>
                </Box>
              </Layer>
            )}
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

            <Form>
              <Box align="start" fill justify="start" direction="row">
                <Box width="20%" justify="center" margin={{ top: "small" }}>
                  <Text textAlign="center"> Opt-in Codes: </Text>
                </Box>
                <Box
                  align="start"
                  fill="horizontal"
                  round="small"
                  border={{ color: "brand", side: "all" }}
                  elevation="small"
                  background={{ color: "white" }}
                  margin={{ top: "small", right: "small" }}
                >
                  <TextArea
                    id="optInCodes"
                    value={optInCodes}
                    onChange={this.handleChange}
                  />
                </Box>
              </Box>
              <Box align="start" fill justify="start" direction="row">
                <Box width="20%" justify="center" margin={{ top: "small" }}>
                  <Text textAlign="center"> Initialize Codes: </Text>
                </Box>
                <Box
                  align="start"
                  fill="horizontal"
                  round="small"
                  border={{ color: "brand", side: "all" }}
                  elevation="small"
                  background={{ color: "white" }}
                  margin={{ top: "small", right: "small" }}
                >
                  <TextArea
                    id="initCodes"
                    gridArea="value1"
                    value={initCodes}
                    onChange={this.handleChange}
                  />
                </Box>
              </Box>
              <Box justify="center" align="center" margin={{ top: "small" }}>
                <Button
                  primary
                  type="submit"
                  label="Submit"
                  onClick={this.submitPlatforms}
                />
              </Box>
            </Form>
          </Tab>
        </Tabs>
        {notification &&
          this.props.message.length > 0 &&
          this.showNotification()}
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
  getBranchingData: PropTypes.func.isRequired,
  setBranch: PropTypes.func.isRequired,
  deleteSurvey: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    currentSurvey: state.surveys.currentSurvey,
    questions: state.surveys.questions,
    message: state.surveys.message,
    branchData: state.surveys.branchData,
    requestSucceed: state.surveys.requestSucceed
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
    getBranchingData: data => dispatch(getBranchingData(data)),
    setBranch: data => dispatch(setBranch(data)),
    changeOrder: data => dispatch(changeOrder(data)),
    deleteSurvey: data => dispatch(deleteSurvey(data)),
    changeRoute: route => dispatch(push(route))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(SurveyEdit);
