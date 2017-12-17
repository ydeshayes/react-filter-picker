import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { withKnobs, object } from '@storybook/addon-knobs';

import { Button, Welcome } from '@storybook/react/demo';
import ReactFilter from "../src";

const stories = storiesOf('React filter', module);

stories.addDecorator(withKnobs);

stories.add('Demo', () => {
  const categories = object('categories', [{label: 'testlabel', value: 'test'}]);
  const values = object('values', {
    test: [{label: 'testlabelvalue', value: 'testvalue'}]
  });


  return (<ReactFilter categories={categories} values={values} onChange={() => {}}/>);
});
