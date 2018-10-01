export class FeedbackBuilder {
  private readonly data: {
    semester?: string;
    easy?: number;
    interesting?: number;
    recommended?: number;
    lecturer?: string;
    tldr?: string;
    text?: string;
  } = {};

  constructor(course?) {
    Object.assign(this.data, course);
  }

  withSemester(semester: string) {
    this.data.semester = semester;
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

  withTldr(tldr: string) {
    this.data.tldr = tldr;
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

export const aFeedback = () => new FeedbackBuilder().withSemester('semester').build();

export const interestingFeedback = () =>
  new FeedbackBuilder()
    .withSemester('2019א')
    .withEasy(1)
    .withInteresting(5)
    .withRecommended(3)
    .withLecturer('מרצה מעניין')
    .withTldr('מעניין')
    .withText('היה מעניין')
    .build();

export const easyFeedback = () =>
  new FeedbackBuilder()
    .withSemester('2018ג')
    .withEasy(5)
    .withInteresting(3)
    .withRecommended(1)
    .withLecturer('מרצה קל')
    .withTldr('קל')
    .withText('היה קל')
    .build();

export const recommendedFeedback = () =>
  new FeedbackBuilder()
    .withSemester('2018ג')
    .withEasy(3)
    .withInteresting(1)
    .withRecommended(5)
    .withLecturer('מרצה מומלץ')
    .withTldr('מומלץ')
    .withText('היה מומלץ')
    .build();

  export const goodFeedback = () =>
    new FeedbackBuilder()
      .withSemester('2018ב')
      .withEasy(5)
      .withInteresting(5)
      .withRecommended(5)
      .withLecturer('מרצה טוב')
      .withTldr('טוב')
      .withText('היה טוב')
      .build();

export const mediocreFeedback = () =>
  new FeedbackBuilder()
    .withSemester('2018א')
    .withEasy(3)
    .withInteresting(3)
    .withRecommended(3)
    .withLecturer('מרצה בינוני')
    .withTldr('בינוני')
    .withText('היה בינוני')
    .build();

export const badFeedback = () =>
  new FeedbackBuilder()
    .withSemester('2018')
    .withEasy(1)
    .withInteresting(1)
    .withRecommended(1)
    .withLecturer('מרצה רע')
    .withTldr('רע')
    .withText('היה רע')
    .build();

export const eastereggFeedback = () =>
  new FeedbackBuilder()
    .withSemester('לחצו')
    .withLecturer('עלי')
    .withTldr('!')
    .withText(
      'ברכות! חלק זה נוצר בהשראת: https://www.facebook.com/whyididnt/. \
     כדי להוסיף לחגיגה יש לכתוב בחלק הפירוט של חלון ״תגובה חדשה״ את הטקסט ״קורסים שחבל שלא לקחתי״ (בדיוק!). \
     הדירוגים ימחקו כדי למנוע רעש על הדאטא האמיתי, אבל בשאר החלקים אפשר לעשות כיד הדמיון(: \
     תהנו!'
    )
    .build();

export const asFeedbacksResponse = feedbacks => ({ feedbacks });
