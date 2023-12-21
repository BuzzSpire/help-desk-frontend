import { ConfigEndpoints } from "@/enums/APIEnum";
import axios from "axios";

// this is the api call to get the default config list
export const getDefaultConfigList = async (token: string) => {
  const res = await axios
    .get(ConfigEndpoints.GetConfigList, {
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

// this is the api call to get the default config
export const getDefaultConfig = async (token: string) => {
  const res = await axios
    .get(ConfigEndpoints.GetDefaultConfig, {
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

// this is the api call to update the default config
export const updateDefaultConfig = async (token: string, id: number) => {
  const res = await axios
    .patch(
      ConfigEndpoints.UpdateDefaultConfig + id,
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
        return null;
      }
    });
  return res;
};

// this is the api call to add the config
export const addConfig = async (
  token: string,
  openTicketStatusId: number,
  closeTicketStatusId: number
) => {
  const res = await axios
    .post(
      ConfigEndpoints.AddConfig,
      {
        openTicketStatusId: openTicketStatusId,
        closeTicketStatusId: closeTicketStatusId,
      },
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
        return null;
      }
    });
  return res;
};

// this is the api call to delete the config
export const deleteConfig = async (token: string, id: number) => {
  const res = await axios
    .delete(ConfigEndpoints.DeleteConfig + id, {
      headers: {
        token: token,
      },
    })
    .then((res) => {
      if (res.data.success) {
        return res.data;
      } else {
        return null;
      }
    });
  return res;
};
