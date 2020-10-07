/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Layout from './src/components/Layout';

const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export default wrapPageElement;
