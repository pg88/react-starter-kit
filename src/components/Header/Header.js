import React from 'react';
import s from './Header.css';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.brand}>
            <img
              src={logoUrl}
              srcSet={`${logoUrl2x} 2x`}
              width="38"
              height="38"
              alt="React"
            />
            <span className={s.brandTxt}>dMetrics - Pablo Garcia E.</span>
          </div>
          <div className={s.banner}>
            <h1 className={s.bannerTitle}>Search Engine Query</h1>
            <p className={s.bannerDesc}>dMetrics programming tasks</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
