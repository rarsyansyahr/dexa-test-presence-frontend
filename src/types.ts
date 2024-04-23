export enum UserLevel {
  Employee = "employee",
  Hr = "hr",
}

export enum PresenceStatus {
  In = "in",
  Out = "out",
}

export type LoginProps = {
  email: string;
  password: string;
};

export type EmployeeForm = {
  phone_number: string;
  password?: string | null;
  photo?: string | null;
};

export type SearchProps = {
  started_at?: string;
  ended_at?: string;
};

export type UpdateEmployeeProps = {
  id: string;
  phone_number?: string;
  photo_path?: string;
  password?: string;
};

export type GetPresencesProps = SearchProps & {
  employeeId?: string;
};

export type Employee = {
  id: string;
  phone_number: string;
  photo_path: string;
  user_id?: string;
  position: string;
  name?: string;
};

export type Profile = {
  id: string;
  email: string;
  name: string;
  level: string;
  employee?: Employee;
};

export type PresenceTime = {
  in_time?: string;
  out_time?: string;
};

export type Presence = PresenceTime & {
  date: string;
  created_at: string;
  name: string;
};
