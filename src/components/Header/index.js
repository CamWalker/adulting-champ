import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';

import './header.css';

export default class AppHeader extends React.Component {
  render() {
    return (
      <header className="container">
        <div className="content">
          <Link className="content-left" to="/">
            <Header size="tiny" float="left" className="logo-title">
              <Icon name="trophy" color="yellow" className="logo-icon" />
              <div className="logo-letter">ADULTING CHAMP</div>
            </Header>
            <div />
          </Link>
          <div className="content-right">
            <Link to="/" className="nav-item">Home</Link>
            {/* <Link to="/checklist" className="nav-item">Checklist</Link> */}
            {/* <div className="nav-menu" /> */}
          </div>
        </div>
      </header>
    );
  }
}