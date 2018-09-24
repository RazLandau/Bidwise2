export class FeedbackBuilder {
  private readonly data: {
    date?: string;
    easy?: number;
    interesting?: number;
    recommended?: number;
    lecturer?: string;
    text?: string;
  } = {};

  constructor(course?) {
    Object.assign(this.data, course);
  }

  withDate(date: string) {
    this.data.date = date;
    return this;
  }

  withEasy(easy: number) {
    this.data.easy = easy;
    return this;
  }

  withInteresting(interesting: number) {
    this.data.interesting = interesting;
    return this;
  }

  withRecommended(recommended: number) {
    this.data.recommended = recommended;
    return this;
  }

  withLecturer(lecturer: string) {
    this.data.lecturer = lecturer;
    return this;
  }

  withText(text: string) {
    this.data.text = text;
    return this;
  }

  build() {
    return { ...this.data };
  }
}

export const aFeedback = () => new FeedbackBuilder().withDate('date').build();

export const complexityFeedback = () =>
  new FeedbackBuilder()
    .withDate('2018ב')
    .withEasy(1)
    .withInteresting(5)
    .withRecommended(3)
    .withLecturer('אמיר שפילקה')
    .withText('אחלה בחלה')
    .build();

export const expsyFeedback = () =>
  new FeedbackBuilder()
    .withDate('2018ב')
    .withEasy(5)
    .withInteresting(1)
    .withRecommended(3)
    .withLecturer('קורל גולצקר')
    .withText('איכסה פיכסה')
    .build();

export const asFeedbacksResponse = feedbacks => ({ feedbacks });
