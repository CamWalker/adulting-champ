import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import { Button, Icon, Feed, Segment, Menu } from 'semantic-ui-react';
import styles from './community.css';

const cx = classnames.bind(styles);



const data = [
  {
    id: 1,
    title: 'This is the first fake article',
    author: 'Bob Baker',
    timePosted: new Date(),
    commentCount: 123,
    voteCount: 333,
  },
  {
    id: 2,
    title: 'This is the second fake article',
    author: 'Bert Booker',
    timePosted: new Date(),
    commentCount: 999,
    voteCount: 8950,
  },
  {
    id: 3,
    title: 'This is the third fake article',
    author: 'Harry Truman',
    timePosted: new Date(),
    commentCount: 3,
    voteCount: 4,
  },
]

export default class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'top',
    };
  }

  get forumContent() {
    return _.map(data, entry => (
      <Feed.Event key={entry.id}>
        <Feed.Label icon='user secret' />
        <Feed.Content>
          <Feed.Summary content={entry.title} date={entry.timePosted.getTime()} />
          <Feed.Meta>
            <Feed.Like onClick={() => this.likeIt(entry.id)}>
              <Icon name='like' />
              {entry.voteCount} Likes
            </Feed.Like>
            &nbsp; &nbsp;•&nbsp; &nbsp;{entry.commentCount} Comments &nbsp;&nbsp;•&nbsp;&nbsp; by {entry.author}
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    ))
  }

  render() {
    return (
      <div className={cx('community')}>
        <Segment className={cx('community-forum')}>
          <Menu pointing secondary color="teal">
            <Menu.Item
              name="top"
              active={this.state.selected === 'top'}
              onClick={() =>  this.setState({ selected: 'top' })}
            />
            <Menu.Item
              name="newest"
              active={this.state.selected === 'newest'}
              onClick={() =>  this.setState({ selected: 'newest' })}
            />
            <Menu.Menu position='right'>
              <Menu.Item>
                <Button color='red' icon labelPosition='left'>
                  <Icon name='pencil' />
                  NEW POST
                </Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
            

          <Feed size="large" className={cx('community-feed')}>
            {this.forumContent}
          </Feed>
        </Segment>
      </div>
    );
  }
}