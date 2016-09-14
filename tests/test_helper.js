import React from 'react';
import chai from 'chai';
import Immutable from 'immutable';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import reducers from '../src/reducers';

const expect = chai.expect;
chai.use(chaiEnzyme());

function renderComponent(Component, props = {}, state = {}) {
  return mount(
    <Provider store={createStore(combineReducers({ ...reducers }), Immutable.fromJS(state))}>
      <Component {...props} />
    </Provider>
  );
}

export {renderComponent, expect};