export class CourseBuilder {
  private readonly data: {
    name?: string;
    course?: string;
    school?: string;
    faculty?: string;
    easy?: number;
    interesting?: number;
    recommended?: number;
    comments?: number;
    id?: string;
  } = {};

  constructor(course?) {
    Object.assign(this.data, course);
  }

  withCourse(course: string) {
    this.data.course = course;
    return this;
  }

  withSchool(school: string) {
    this.data.school = school;
    return this;
  }

  withFaculty(faculty: string) {
    this.data.faculty = faculty;
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
    .withCourse('קורס')
    .withSchool('חוג')
    .withFaculty('פקולטה')
    .withEasy(1)
    .withInteresting(5)
    .withRecommended(3)
    .withComments(1)
    .withId('0')
    .build();

export const complexityCourse = () =>
  new CourseBuilder()
    .withCourse('סיבוכיות')
    .withSchool('מדעי המחשב')
    .withFaculty('מדעים מדויקים')
    .withEasy(1)
    .withInteresting(5)
    .withRecommended(3)
    .withComments(3)
    .withId('complexity')
    .build();

export const expsyCourse = () =>
  new CourseBuilder()
    .withCourse('פסיכולוגיה ניסויית')
    .withSchool('פסיכולוגיה')
    .withFaculty('מדעי החברה')
    .withEasy(5)
    .withInteresting(1)
    .withRecommended(3)
    .withComments(3)
    .withId('expsy')
    .build();

export const eastereggCourse = () =>
  new CourseBuilder()
  .withSchool('קורסים שחבל שלא לקחתי')
  .withFaculty('מדעי הדשא')
  .withId('easteregg')
  .build();

export const asCoursesResponse = courses => ({ courses });
