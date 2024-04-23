export enum UserLevel {
  Employee = "employee",
  Hr = "hr",
}

export type LoginProps = {
  email: string;
  password: string;
};

type Employee = {
  id: string;
  phone_number: string;
  photo_path: string;
  user_id: string;
  position: string;
};

export type Profile = {
  id: string;
  email: string;
  name: string;
  level: string;
  employee?: Employee;
};
