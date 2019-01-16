import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Box, Button, TextInput, Text, TextArea } from 'grommet';
import { Formik } from 'formik';
import * as Yup from 'yup';

import StyledForm from 'components/StyledForm';
import FormErrorText from 'components/FormErrorText';
import { Helmet } from 'react-helmet';

export default function SurveyNew(props) {
  const { isOpen, onSubmit, askToClose, onAfterOpen } = props;

  const customStyles = {
    content: {
      width: '50%',
      margin: '0 auto',
    },
  };

  const { signupError } = 'Some error';

  return (
    <Modal
      id="createSurvey"
      closeTimeoutMS={150}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      style={customStyles}
    >
      <Helmet title="Create Survey" />
      <Formik
        initialValues={{
          name: '',
          description: '',
          introString: '',
          completionString: '',
          incentive: 0,
          currency: 'KES',
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Required'),
          description: Yup.string().required('Required'),
          introString: Yup.string().required('Required'),
          completionString: Yup.string().required('Required'),
          incentive: Yup.number()
            .positive('Positive number only')
            .required('Required'),
        })}
        onSubmit={onSubmit}
      >
        {({
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Text margin={{ horizontal: 'xsmall' }} textAlign="center">
              Create a new Survey
            </Text>
            <Box
              fill="horizontal"
              round="small"
              border={{ color: 'brand', side: 'all' }}
              elevation="small"
              background={{ color: 'white' }}
              margin={{ top: 'medium' }}
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
                errors.name &&
              touched.name && <FormErrorText error={errors.name} />}
            <Box
              fill="horizontal"
              round="small"
              border={{ color: 'brand', side: 'all' }}
              elevation="small"
              background={{ color: 'white' }}
              margin={{ top: 'small' }}
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
                errors.description &&
              touched.description && (
                <FormErrorText error={errors.description} />
              )}
            <Box
              fill="horizontal"
              round="small"
              border={{ color: 'brand', side: 'all' }}
              elevation="small"
              background={{ color: 'white' }}
              margin={{ top: 'small' }}
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
                errors.introString &&
              touched.introString && (
                <FormErrorText error={errors.introString} />
              )}
            <Box
              fill="horizontal"
              round="small"
              border={{ color: 'brand', side: 'all' }}
              elevation="small"
              background={{ color: 'white' }}
              margin={{ top: 'small' }}
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
                errors.completionString &&
              touched.completionString && (
                <FormErrorText error={errors.completionString} />
              )}
            <Box
              fill="horizontal"
              round="small"
              border={{ color: 'brand', side: 'all' }}
              elevation="small"
              background={{ color: 'white' }}
              margin={{ top: 'small' }}
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
                errors.incentive &&
              touched.incentive && <FormErrorText error={errors.incentive} />}
            <Box
              fill="horizontal"
              round="small"
              border={{ color: 'brand', side: 'all' }}
              elevation="small"
              background={{ color: 'white' }}
              margin={{ top: 'small' }}
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
                errors.currency &&
              touched.currency && <FormErrorText error={errors.currency} />}
            <Box
              direction="row"
              fill="horizontal"
              justify="between"
              margin={{ top: 'small' }}
              pad={{ horizontal: 'xsmall' }}
            >
              <Button label="Cancel" onClick={askToClose} />
              <Button
                primary
                disabled={!dirty || isSubmitting}
                label="Submit"
                onClick={handleSubmit}
              />
            </Box>
            <Box
              direction="column"
              margin={{ vertical: 'xsmall' }}
              justify="center"
            >
              {signupError && (
                <FormErrorText error={signupError} textAlign="center" />
              )}
            </Box>
          </StyledForm>
        )}
      </Formik>
    </Modal>
  );
}
SurveyNew.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  askToClose: PropTypes.func,
  onAfterOpen: PropTypes.func,
};
