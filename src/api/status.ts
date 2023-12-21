import { TicketStatusEndpoints } from "@/enums/APIEnum";
import axios from "axios";

// add ticket status
export const addSTickettatus = async (token: string, status: string) => {
  const res = await axios
    .post(
      TicketStatusEndpoints.AddTicketStatus,
      {
        status: status,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
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

// get ticket status list
export const getTicketStatusList = async (token: string) => {
  const res = await axios
    .get(TicketStatusEndpoints.GetAllTicketStatus, {
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

// delete ticket status
export const deleteTicketStatus = async (token: string, id: number) => {
  const res = await axios
    .delete(TicketStatusEndpoints.DeleteTicketStatus + id, {
      headers: {
        token: token,
      },
    })
    .then((res) => {
      if (res.data.success) {
        return res.data;
      } else {
        return res.data;
      }
    });
  return res;
};
