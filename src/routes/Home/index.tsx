import { connect } from 'dva';
import * as React from 'react';
import * as styles from './style.css';

function HomePage(props: any) {
    return (
        <div className={styles.title}>
            测试页面
        </div>
    )
}

function mapStateToProps(state: any) {
    return {
        count: state.count,
    }
}

export default connect(mapStateToProps)(HomePage)