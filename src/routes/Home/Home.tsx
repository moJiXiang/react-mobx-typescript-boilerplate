import * as React from "react";
import * as styles from "./Home.scss";

interface IState {
    count: number;
}

export default class Home extends React.Component<{}, IState> {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    public handleButtonClick = () => {
        this.setState((prevState) => ({
            count: prevState.count + 1,
        }));
    }

    public render() {
        return (
            <div className={styles.title}>
                测试页面
                <span>{this.state.count}</span>
                <button onClick={this.handleButtonClick}>点击</button>
            </div>
        );
    }
}
