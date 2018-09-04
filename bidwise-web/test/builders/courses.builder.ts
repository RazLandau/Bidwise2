export class CourseBuilder {
  private readonly data: {
    name?: string;
    easy?: number;
    interesting?: number;
    recommended?: number;
    comments?: number;
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
    .withComments(4)
    .build();

export const asCoursesResponse = courses => ({ courses });
