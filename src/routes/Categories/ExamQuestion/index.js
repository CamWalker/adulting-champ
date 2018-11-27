import React from 'react';
import { Redirect } from 'react-router-dom';
import { Segment, Header, Button, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import { observer, inject } from 'mobx-react';
import resources from '../resources';
import styles from './examQuestion.css';

const cx = require('classnames').bind(styles);

class ExamQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      questions: _.get(this.category, 'questions', null),
    };
  }

  get categoryKey() {
    return _.get(this.props, 'match.params.category', null);
  }

  get category() {
    return _.get(resources, this.categoryKey);
  }

  get header() {
    return (
      <Header size="huge" color={this.category.colorName} dividing >
        <Header  color={this.category.colorName} className={cx("exam-question-header")}>
          <div>
            <Icon name={this.category.icon} />
            {this.category.name}
          </div>
          <Header.Subheader className={cx("exam-question-subheader")}>
            Question {this.state.questionIndex + 1} of {this.state.questions.length}
          </Header.Subheader>
        </Header>
      </Header>
    )
  }

  get currentQuestion() {
    return _.get(this.state.questions, [this.state.questionIndex], null);
  }

  toPrevious = () => {
    this.setState(prevState => ({ questionIndex: prevState.questionIndex - 1 }));
  }
  
  toNext = () => {
    this.setState(prevState => ({ questionIndex: prevState.questionIndex + 1, complete: prevState.questionIndex + 1 >= prevState.questions.length }), () => {
      if (!this.state.complete) {
        const dependency = _.get(this, ['props', 'store', 'examResults', this.categoryKey, this.currentQuestion.dependency], undefined);
        if (!dependency && !_.isUndefined(dependency)) {
          this.toNext();
        }
      } else {
        this.props.store.save();
      }
    });
  }
  
  setExamResult = (result) => {
    this.props.store.setExamResult(this.categoryKey, this.currentQuestion.key, result);
    this.toNext();
  };

  render() {
    if (!_.get(this.category, 'ready', false)) {
      return <Redirect to="/" />;
    }

    if (this.state.complete || !this.currentQuestion) {
      return <Redirect to={`/${this.categoryKey}`} />;
    }

    return (
      <div className={cx("exam-question-container")}>
        <Segment
          raised
          stacked
          padded="very"
          className={cx("exam-question-card")}
        >
          {this.header}
          <Header
            size="large"
            content={_.get(this.currentQuestion, 'text', '')}
            subheader={_.get(this.currentQuestion, 'note', '')}
            color="grey"
            className={cx("exam-question-question")}
          />
          <Button.Group>
            <Button onClick={() => this.setExamResult(true)} color="teal">Yes</Button>
            <Button.Or />
            <Button onClick={() => this.setExamResult(false)} color="red">No</Button>
          </Button.Group>
        </Segment>
      </div>
    )
  }
}

export default inject('store')(observer(ExamQuestion));