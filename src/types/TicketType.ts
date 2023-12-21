import { TicketMessage } from "./TicketMessageType";
import { TicketPriority } from "./TicketPriorityType";
import { TicketStatus } from "./TicketStatusType";
import { User } from "./userType";

export type Ticket = {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  date: Date;
  user: User;
  assignedTo: User;
  messages: TicketMessage[];
};
