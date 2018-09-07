export class FacultyBuilder {
  private readonly data: {
    name?: string;
    id?: string;
    schools: string[];
  } = { schools: [] };

  constructor(faculty?) {
    Object.assign(this.data, faculty);
  }

  withName(name: string) {
    this.data.name = name;
    return this;
  }

  withSchool(name: string) {
    this.data.schools.push(name);
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

export const aFaculty = () =>
  new FacultyBuilder()
    .withName('מדעים מדויקים')
    .withSchool('מדעי המחשב')
    .withId('exact')
    .build();

export const exactSciencesFaculty = () =>
  new FacultyBuilder()
    .withName('מדעים מדויקים')
    .withSchool('מדעי המחשב')
    .withId('exact')
    .build();

export const socialSciencesFaculty = () =>
  new FacultyBuilder()
    .withName('מדעי החברה')
    .withSchool('פסיכולוגיה')
    .withId('social')
    .build();

export const asFacultiesResponse = faculties => ({ faculties });
