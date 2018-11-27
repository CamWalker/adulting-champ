import React from 'react';
import _ from 'lodash';
import { Header, Icon, Card } from 'semantic-ui-react';
import resources from './resources';
import './categories.css';

// const fakeData = [
  // {
  //   name: 'Health & Wellness',
  //   key: 'health',
  //   description: '',
  //   icon: 'heartbeat',
  //   colorName: 'pink',
  //   color: '#e03997',
  //   ready: false,
  // },
  // {
  //   name: 'Emergency Prep',
  //   key: 'emergency',
  //   description: '',
  //   icon: 'fire extinguisher',
  //   colorName: 'red',
  //   color: '#db2828',
  //   ready: false,
  // },
  // {
  //   name: 'Career',
  //   key: 'career',
  //   description: '',
  //   icon: 'briefcase',
  //   colorName: 'teal',
  //   color: '#00b5ad',
  //   ready: false,
  // },
  // {
  //   name: 'Relationships',
  //   key: 'relationship',
  //   description: '',
  //   icon: 'users',
  //   colorName: 'violet',
  //   color: '#6435c9',
  //   ready: false,
  // },
  // {
  //   name: 'Dress & Appearance',
  //   key: 'dress',
  //   description: '',
  //   icon: 'handshake outline',
  //   colorName: 'black',
  //   color: '#1b1c1d',
  //   ready: false,
  // },
// ]

export default class Categories extends React.Component {
  state = {
    category: '',
  };

  handleNav = (category) => {
    if (category.ready) {
      this.props.history.push(`${category.key}`)
    }
  } 

  get categoryCards() {
    return _.map(resources, category => {
      const hovering = this.state.category === category.name;
      const color = hovering ? category.colorName : 'grey';
      return (
        <Card
          raised
          color={color}
          onMouseEnter={() => this.setState({ category: category.name })}
          onMouseLeave={() => this.setState({ category: '' })}
          className="card"
          link
          onClick={() => this.handleNav(category)}
          key={category.name}
        >
          <Header as="h2" color={color}>
            {category.name}
          </Header>
          <div>
            <Icon name={category.icon} color={color} size='massive' />
          </div>
          <div style={{ height: 1 }} />
          {category.ready && <Header as="h3" color="grey">{category.description}</Header>}
          {!category.ready && <Header as="h3" color="grey">Coming Soon</Header>}
        </Card>
      )
    });
  }

  render() {
    return (
      <div className="categories">
        <Header size="huge">
          <Header.Content>
            Categories
            <Header.Subheader as="h2">Take one step closer to being an adulting champ. Pick a category below.</Header.Subheader>
          </Header.Content>
        </Header>
        <div className="card-container">
          <Card.Group stackable itemsPerRow="3">
            {this.categoryCards}
          </Card.Group>
        </div>
      </div>
    )
  }
}