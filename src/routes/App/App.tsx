import axios from "axios";
import { connect } from "dva";
import * as React from "react";

// tslint:disable-next-line:no-var-requires
// tslint:disable-next-line:no-unused-expression
(process.env.NODE_ENV === "mock") && (require("../../mock/todos"));

import logo from "../../assets/imgs/logo.svg";
import * as Style from "./App.scss";

interface IState {
  todos: any[];
}

export class App extends React.Component<any, IState> {

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  public handleButtonClick = () => {
    console.log("bunnton click");
    this.props.dispatch({
      type: "count/addWithDelay",
    });
  }

  public componentDidMount() {
    axios.get("http://todo.json")
      .then((res) => {
        console.log(res);
        this.setState({todos: res.data.list});
      });
  }

  public render() {
    const { count, submitting } = this.props;
    return (
      <div className={Style.App}>
        <header className={Style["App-header"]}>
          <img src={logo} className={Style["App-logo"]} alt="logo" />
          <h1 className={Style["App-title"]}>Welcome to React</h1>
        </header>
        <ul>
          {this.state.todos.map((todo, i) => {
            return <li key={i}>{todo.name}</li>;
          })}
        </ul>
        <div>
          {submitting ? "loading..." : ""}
          Count: {count}

          <button id="add_btn" onClick={this.handleButtonClick}>ADD</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ count, loading }) => ({
  count,
  submitting: loading.effects["count/addWithDelay"],
});

export default connect(mapStateToProps)(App);
