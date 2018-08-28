export class FacultyBuilder {
  private readonly data: { name?: string } = {};

  constructor(faculty?) {
    Object.assign(this.data, faculty);
  }

  withName(name: string) {
    this.data.name = name;
    return this;
  }

  build() {
    return { ...this.data };
  }
}

export const aFaculty = () =>
  new FacultyBuilder().withName('מדעי המחשב').build();

export const asFacultiesResponse = faculties => ({ faculties });
