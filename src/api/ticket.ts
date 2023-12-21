import { TicketEndpoints } from "@/enums/APIEnum";
import axios from "axios";

// this is the api call to get the ticket list
export const getAllTickets = async (token: string, page: number) => {
  const res = axios
    .get(TicketEndpoints.GetAllTickets + `${page}/24`, {
      headers: {
        token: token,
      },
    })
    .then((res) => {
      if (res.data.success) {
        return res.data.data;
      } else {
        return [];
      }
    });
  return res;
};

// this is the api call to get the ticket by id
export const getTicketById = async (token: string, id: string | string[]) => {
  const res = axios
    .get(TicketEndpoints.GetTicketById + id, {
      headers: {
        token: token,
      },
    })
    .then((res) => {
      if (res.data.success) {
        return res.data.data;
      }
    });
  return res;
};

// closed ticket status
export const closedTicket = async (token: string, id: number) => {
  const res = axios
    .patch(
      TicketEndpoints.CloseTicket + id,
      {},
      {
        headers: {
          token: token,
        },
      }
    )
    .then((res) => {
      if (res.data.success) {
        return res.data;
      } else {
        return res.data;
      }
    });
  return res;
};

// get my tickets
export const getMyTickets = async (token: string) => {
  const res = await axios
    .get(TicketEndpoints.GetMyTickets, {
      headers: {
        token: token,
      },
    })
    .then((res) => {
      if (res.data.success) {
        return res.data.data;
      } else {
        return null;
      }
    });
  return res;
};

// update ticket status
export const updateTicketStatus = async (
  token: string,
  ticketID: number,
  statusID: number
) => {
  const res = await axios
    .patch(
      TicketEndpoints.UpdateTicketStatus.replace(
        "{ticketId}",
        ticketID.toString()
      ).replace("{statusId}", statusID.toString()),
      {},
      {
        headers: {
          token: token,
        },
      }
    )
    .then((res) => {
      if (res.data.success) {
        return res.data;
      } else {
        return res.data;
      }
    });
  return res;
};
