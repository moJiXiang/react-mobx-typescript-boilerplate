import * as React from 'react';
import logoSvg from 'src/assets/imgs/logo.svg';

export interface IHomeProps {
  index: number;
}

export interface IHomeState {

}

export default class Home extends React.Component<IHomeProps, IHomeState> {

  render() {
    return (
      <div>Home
        <img style={{ width: '100px' }} src={logoSvg} alt=""/>
      </div>
    );
  }
}
