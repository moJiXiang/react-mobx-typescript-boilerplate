import * as React from 'react';
import { Link } from 'react-router-dom';

export class Root extends React.Component<any, any> {

  render() {
    return (
      <div className="container">
        <ul>
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/todoapp">TodoApp</Link>
          </li>
        </ul>
        {this.props.children}
        {/* {this.renderDevTool()} */}
      </div>
    );
  }

  // private renderDevTool() {
  //   if (process.env.NODE_ENV !== 'production') { } {
  //     const DevTools = require('mobx-react-devtools').default;
  //     return <DevTools />;
  //   }
  // }
}
