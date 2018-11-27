import React from 'react';
import { Segment, SegmentGroup, Icon, Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';
import resources from '../resources';
import styles from './main.css';

const cx = require('classnames').bind(styles);

class Main extends React.Component {
  get categoryKey() {
    return _.get(this.props, 'match.params.category', null);
  }

  get category() {
    return _.get(resources, this.categoryKey);
  }

  get examResults() {
    return _.get(this, ['props', 'store', 'examResults', this.categoryKey]);
  }

  get score() {
    const score = _.reduce(
      this.category.questions, 
      (result, question) => {
        if (_.get(this.examResults, question.key)) {
          return result + question.value;
        }
        return result;
      },
      _.get(this.category, 'startingScore', 0),
    );

    return score / _.get(this.category, 'max', 0);
  }

  get scoreHeader() {
    return (
      this.score >= 0.8
        ? { content: 'Gold', subheader: 'Great work!' }
        : this.score >= 0.5
          ? { content: 'Silver', subheader: 'You\'re almost there' }
          : { content: 'Bronze', subheader: 'Time to take action' }
    );
  }

  get tasks() {
    return _.map(
      _.filter(this.category.tasks, (task, id) => {
        if (id > 2) {
          return false;
        }
        return _.reduce(task.dependency, (keepTask, dependency) => {
          if (dependency.inverted) {
            return keepTask || (_.get(this.examResults, dependency.key, false) && _.get(this.examResults, dependency.dependency, true));
          }
          return keepTask || (!_.get(this.examResults, dependency.key, false) && _.get(this.examResults, dependency.dependency, true));
        }, false)
      }),
      (task, index) => (
        <React.Fragment key={task.text}>
          <Header content={`(${index + 1}) ${_.toUpper(task.text)}`} attached className="result-header" color={this.category.colorName} />
          <Segment attached padded>Content is going here</Segment>
        </React.Fragment>
      )
    );
  }

  render() {
    if (!_.get(this.category, 'ready', false)) {
      return <Redirect to="/" />;
    }

    if (_.isEmpty(this.examResults)) {
      return <Redirect to={`/${this.categoryKey}/evaluation`} />;
    }

    const { score } = this;

    return (
      <SegmentGroup
        raised
        padded="very"
        className="results"
      >
        <Header as="h1" content={_.toUpper(this.category.name)} color={this.category.colorName} attached="top" />
        <Segment className={cx("results-top")} padded>
          <Icon name="trophy" size="massive" className={cx("bronze", { gold: score >= 0.8, silver: score >= 0.5 })} />
          <Header size="huge" content={this.scoreHeader.content} subheader={this.scoreHeader.subheader} className={cx("bronze", { gold: score >= 0.8, silver: score >= 0.5 })} />
        </Segment>
        <Header size="large" content="Next Steps" attached className="result-header" />
        {this.tasks}
      </SegmentGroup>
    )
  }
}

export default inject('store')(observer(Main));