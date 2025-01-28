import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "sonner";

// (public api)
export const getNewds = async () => {
  try {
    const response = await axios.get(API_URL + "/news");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get Newd (public data)
export const getNewd = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/new/" + _id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// add new Newd (admin api)
export const addNewNewd = async (name, token) => {
  try {
    const response = await axios.post(
      API_URL + "/newds",
      {
        name: name,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          // Bearer dmedkefmekfek93kmd3k3od3o...
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// update Newd (admin api)
export const editNewd = async (_id, name, token) => {
  try {
    const response = await axios.put(
      API_URL + "/newds/" + _id,
      {
        name: name,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// delete Newd (admin api)
export const deleteNewd = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + `/newds/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
