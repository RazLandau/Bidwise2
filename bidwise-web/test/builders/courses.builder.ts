export class CourseBuilder {
  private readonly data: {
    name?: string;
    easy?: number;
    interesting?: number;
    recommended?: number;
    comments?: number;
    id?: string;
  } = {};

  constructor(course?) {
    Object.assign(this.data, course);
  }

  withName(name: string) {
    this.data.name = name;
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

  withComments(comments: number) {
    this.data.comments = comments;
    return this;
  }

  withId(id: string) {
    this.data.id = id;
    return this;
  }

  build() {
    return { ...this.data };
  }
}

export const aCourse = () =>
  new CourseBuilder()
    .withName('סיבוכיות')
    .withEasy(1)
    .withInteresting(5)
    .withRecommended(3)
    .withComments(1)
    .withId('0')
    .build();

export const csCourse = () =>
  new CourseBuilder()
    .withName('סיבוכיות')
    .withEasy(1)
    .withInteresting(5)
    .withRecommended(3)
    .withComments(1)
    .withId('1')
    .build();

export const psyCourse = () =>
  new CourseBuilder()
    .withName('ניסויית')
    .withEasy(5)
    .withInteresting(1)
    .withRecommended(3)
    .withComments(1)
    .withId('2')
    .build();

export const asCoursesResponse = courses => ({ courses });
