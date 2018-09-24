import * as React from 'react';
import Card from 'wix-style-react/Card';
import Text from 'wix-style-react/Text';

export interface FeedbackCardProps {
  title: string;
  subtitle: string;
  easy: number;
  interesting: number;
  recommended: number;
  text: string;
}

class FeedbackCard extends React.Component<FeedbackCardProps> {
  render() {
    const { title, subtitle, text } = this.props;
    return (
      <Card className="rtl" stretchVertically>
        <Card.Header
          title={title}
          subtitle={subtitle}
          suffix={
            <div>
              <div>{this.renderEasy()}</div>
              <div>{this.renderInteresting()}</div>
              <div>{this.renderRecommended()}</div>
            </div>
          }
        />
        <Card.Content>
          <Text data-hook="text" style={{ wordWrap: 'break-word' }}>
            {text}
          </Text>
        </Card.Content>
      </Card>
    );
  }

  renderEasy() {
    const { easy } = this.props;
    const rating = [];
    for (let i = 0; i < easy; i++) {
      rating.push(
        <Text
          key={i}
          data-hook="easy-yes"
          size="small"
          style={{ float: 'left' }}
        >
          💯
        </Text>,
      );
    }
    for (let i = easy; i < 5; i++) {
      rating.push(
        <Text
          key={i}
          data-hook="easy-no"
          size="small"
          style={{ float: 'left', opacity: 0.1 }}
        >
          💯
        </Text>,
      );
    }
    return rating;
  }

  renderInteresting() {
    const { interesting } = this.props;
    const rating = [];
    for (let i = 0; i < interesting; i++) {
      rating.push(
        <Text
          key={i}
          data-hook="interesting-yes"
          size="small"
          style={{ float: 'left' }}
        >
          🧠
        </Text>,
      );
    }
    for (let i = interesting; i < 5; i++) {
      rating.push(
        <Text
          key={i}
          data-hook="interesting-no"
          size="small"
          style={{ float: 'left', opacity: 0.1 }}
        >
          🧠
        </Text>,
      );
    }
    return rating;
  }

  renderRecommended() {
    const { recommended } = this.props;
    const rating = [];
    for (let i = 0; i < recommended; i++) {
      rating.push(
        <Text
          key={i}
          data-hook="recommended-yes"
          size="small"
          style={{ float: 'left' }}
        >
          👍
        </Text>,
      );
    }
    for (let i = recommended; i < 5; i++) {
      rating.push(
        <Text
          key={i}
          data-hook="recommended-no"
          size="small"
          style={{ float: 'left', opacity: 0.1 }}
        >
          👍
        </Text>,
      );
    }
    return rating;
  }
}

export default FeedbackCard;
