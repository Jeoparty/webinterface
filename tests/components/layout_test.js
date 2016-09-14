import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import Nav from '../../src/containers/nav';
import Layout from '../../src/components/layout';

const expect = chai.expect;

chai.use(chaiEnzyme());

describe('<Layout />', () => {

  it('renders main and Nav element', () => {
    const wrapper = shallow(<Layout />);

    expect(wrapper.find(Nav)).to.have.length(1);
  });

});