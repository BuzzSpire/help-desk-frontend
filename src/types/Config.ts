import { TicketStatus } from "./TicketStatusType";

export type Config = {
  id: number;
  openTicketStatus: TicketStatus;
  closeTicketStatus: TicketStatus;
};
