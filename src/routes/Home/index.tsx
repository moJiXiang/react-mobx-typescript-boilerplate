import * as React from 'react';

export interface IHomeProps {
  index: number;
}

export interface IHomeState {

}

export default class Home extends React.Component<IHomeProps, IHomeState> {

  render() {
    return (
      <div>Home</div>
    );
  }
}
