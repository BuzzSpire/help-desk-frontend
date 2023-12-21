import { UserTitle } from "./UserTitleType";

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  title: UserTitle;
};
