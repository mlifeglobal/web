import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { push } from "connected-react-router";

import { Box, Text, TextInput, Button, RadioButton, CheckBox } from "grommet";

import {
  startSurvey,
  submitAnswer,
  resetSurveyData
} from "../../state/actions";

export class QuestionDisplay extends React.PureComponent {
  state = {
    answer: ""
  };

  onSubmitAnswer = () => {
    const { answer } = this.state;
    if (answer) {
      const {
        survey: {
          surveyId,
          question: { questionId }
        }
      } = this.props.filler;
      this.props.submitAnswer({ surveyId, questionId, answer });
      this.setState({ answer: "" });
    }
  };

  onChange = ({ target }) => {
    const { answer } = this.state;
    if (target.type === "checkbox") {
      const key = target.id.split("_")[2];
      const answersList = answer === "" ? [] : answer.split(",");
      const indexOfKey = answersList.indexOf(key);

      if (target.checked && indexOfKey < 0) {
        answersList.push(key);
      } else if (indexOfKey) {
        answersList.splice(indexOfKey, 1);
      }

      this.setState({ answer: answersList.join() });
    } else {
      this.setState({ answer: target.value });
    }
  };

  renderInputFields = () => {
    const {
      survey: {
        question: { questionId, questionType, answerType, answers }
      }
    } = this.props.filler;
    const { answer } = this.state;

    let body = <TextInput value={answer} onChange={this.onChange} />;
    if (questionType === "mcq") {
      body =
        answerType === "single" ? (
          <Box gap="small">
            {Object.keys(answers).map(key => (
              <RadioButton
                key={`${questionId}_${key}`}
                id={`radio_${questionId}_${key}`}
                label={answers[key]}
                name="radio"
                value={key}
                onChange={this.onChange}
                checked={answer === key}
              />
            ))}
          </Box>
        ) : (
          <Box gap="small">
            {Object.keys(answers).map(key => (
              <CheckBox
                key={`${questionId}_${key}`}
                id={`checkbox_${questionId}_${key}`}
                label={answers[key]}
                onChange={this.onChange}
                checked={answer !== "" && answer.split(",").includes(key)}
              />
            ))}
          </Box>
        );
    }

    return body;
  };

  renderQuestion = () => {
    const {
      survey: {
        question: { question },
        loading
      }
    } = this.props.filler;
    const { answer } = this.state;

    return (
      <Box
        gap="small"
        pad={{ horizontal: "small", vertical: "small" }}
        width="large"
        round="medium"
        border={{ color: "brand", side: "all" }}
        elevation="small"
        background={{ color: "white" }}
      >
        <Text
          margin={{ horizontal: "xsmall", bottom: "xsmall" }}
          textAlign="center"
        >
          {question}
        </Text>

        {this.renderInputFields()}

        <Button
          primary
          disabled={loading || answer === ""}
          label="Submit your answer"
          onClick={this.onSubmitAnswer}
        />
      </Box>
    );
  };

  renderString = status => {
    const {
      survey: { surveyId, introString, completionString },
      loading
    } = this.props.filler;
    const isNew = status === "new";

    return (
      <Box
        gap="small"
        pad={{ horizontal: "small", vertical: "small" }}
        width="medium"
        round="medium"
        border={{ color: "brand", side: "all" }}
        elevation="small"
        background={{ color: "white" }}
      >
        <Text
          margin={{ horizontal: "xsmall", bottom: "xsmall" }}
          textAlign="center"
        >
          {isNew ? introString : completionString}
        </Text>
        <Button
          primary
          disabled={loading}
          label={`${isNew ? "Start Survey" : "Fill another survey"}`}
          onClick={() => {
            if (isNew) {
              this.props.startSurvey({ surveyId });
            } else {
              this.props.changeRoute("/filler/optin");
              this.props.resetSurveyData();
            }
          }}
        />
      </Box>
    );
  };

  render() {
    const {
      survey: { status }
    } = this.props.filler;

    return (
      <>
        <Helmet title="Survey Filler" />
        {status === "new" || status === "completed"
          ? this.renderString(status)
          : this.renderQuestion()}
      </>
    );
  }
}

QuestionDisplay.propTypes = {
  filler: PropTypes.object.isRequired,
  submitAnswer: PropTypes.func.isRequired,
  startSurvey: PropTypes.func.isRequired,
  resetSurveyData: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    filler: state.filler
  };
}
function mapDispatchToProps(dispatch) {
  return {
    startSurvey: payload => dispatch(startSurvey(payload)),
    submitAnswer: payload => dispatch(submitAnswer(payload)),
    resetSurveyData: () => dispatch(resetSurveyData()),
    changeRoute: route => dispatch(push(route))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionDisplay);
