import * as React from 'react';
import Card from 'wix-style-react/Card';
import { Container, Row, Col } from 'wix-style-react/Grid';
import Text from 'wix-style-react/Text';

export interface CourseCardProps {
  title: string;
  easy: number;
  interesting: number;
  recommended: number;
  comments: number;
}

class CourseCard extends React.Component<CourseCardProps> {
  render() {
    const { title, comments } = this.props;
    return (
      <Card className="rtl" stretchVertically>
        <Card.Header suffix={<Text>{comments} תגובות</Text>} title={title} />
        <Card.Content>
          <Container fluid>
            {this.renderEasy()}
            {this.renderInteresting()}
            {this.renderRecommended()}
          </Container>
        </Card.Content>
      </Card>
    );
  }

  renderEasy() {
    const { easy } = this.props;
    const rating = [];
    for (let i = 0; i < easy; i++) {
      rating.push(
        <span
          key={i}
          data-hook="easy-yes"
          style={{ float: 'left', fontSize: '25px' }}
        >
          💯
        </span>,
      );
    }
    for (let i = easy; i < 5; i++) {
      rating.push(
        <span
          key={i}
          data-hook="easy-no"
          style={{ float: 'left', fontSize: '25px', opacity: 0.1 }}
        >
          💯
        </span>,
      );
    }
    return (
      <Row>
        <Col rtl span={3}>
          <Text data-hook="easy-text">קל</Text>
        </Col>
        <Col rtl span={9}>
          {rating}
        </Col>
      </Row>
    );
  }

  renderInteresting() {
    const { interesting } = this.props;
    const rating = [];
    for (let i = 0; i < interesting; i++) {
      rating.push(
        <span
          key={i}
          data-hook="interesting-yes"
          style={{ float: 'left', fontSize: '25px' }}
        >
          🧠
        </span>,
      );
    }
    for (let i = interesting; i < 5; i++) {
      rating.push(
        <span
          key={i}
          data-hook="interesting-no"
          style={{ float: 'left', fontSize: '25px', opacity: 0.1 }}
        >
          🧠
        </span>,
      );
    }
    return (
      <Row>
        <Col rtl span={3}>
          <Text data-hook="interesting-text">מעניין</Text>
        </Col>
        <Col rtl span={9}>
          {rating}
        </Col>
      </Row>
    );
  }

  renderRecommended() {
    const { recommended } = this.props;
    const rating = [];
    for (let i = 0; i < recommended; i++) {
      rating.push(
        <span
          key={i}
          data-hook="recommended-yes"
          style={{ float: 'left', fontSize: '25px' }}
        >
          👍
        </span>,
      );
    }
    for (let i = recommended; i < 5; i++) {
      rating.push(
        <span
          key={i}
          data-hook="recommended-no"
          style={{ float: 'left', fontSize: '25px', opacity: 0.1 }}
        >
          👍
        </span>,
      );
    }
    return (
      <Row>
        <Col rtl span={3}>
          <Text data-hook="recommended-text">מומלץ</Text>
        </Col>
        <Col rtl span={9}>
          {rating}
        </Col>
      </Row>
    );
  }
}

export default CourseCard;
