import { TicketMassageEndpoints } from "@/enums/APIEnum";
import axios from "axios";

// this is the api call to add ticket message
export const addTicketMessage = async (
  token: string,
  ticketId: number | undefined,
  message: string
) => {
  const res = axios
    .post(
      TicketMassageEndpoints.AddTicketMassage,
      {
        ticketId: ticketId,
        message: message,
      },
      {
        headers: {
          token: token,
        },
      }
    )
    .then((res) => {
      return res.data.success;
    });
  return res;
};

// this is the api call to delete ticket message
export const deleteTicketMessage = async (id: number, token: string) => {
  const res = axios
    .delete(TicketMassageEndpoints.DeleteTicketMassage + id, {
      headers: {
        token: token,
      },
    })
    .then((res) => {
      return res.data.success;
    });
  return res;
};
