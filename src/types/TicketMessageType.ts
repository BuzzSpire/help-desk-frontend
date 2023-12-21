import { Ticket } from "./TicketType";
import { User } from "./userType";

export type TicketMessage = {
  id: number;
  message: string;
  date: Date;
  sender: User;
  ticket: Ticket;
};
