export class FacultyBuilder {
  private readonly data: { name?: string; schools: string[] } = { schools: [] };

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

  build() {
    return { ...this.data };
  }
}

export const aFaculty = () =>
  new FacultyBuilder()
    .withName('מדעים מדויקים')
    .withSchool('מדעי המחשב')
    .build();

export const asFacultiesResponse = faculties => ({ faculties });
