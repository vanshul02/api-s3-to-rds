enum Gender {
  male,
  female,
}

export interface DataRequest {
  id: string;
  name: string;
  surname: string;
  dob: string;
  gender: Gender;
}

export interface ResponseResult {
  affectedRows: number;
}
