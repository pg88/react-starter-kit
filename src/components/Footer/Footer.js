
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <span className={s.text}>© dMetrics</span>
          <span className={s.spacer}>·</span>
          <span className={s.text}>Pablo Garcia E.</span>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
