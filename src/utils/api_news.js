import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "sonner";

// (public api)
export const getNewds = async (sortBy = "", sortOrder = "") => {
  try {
    const response = await axios.get(API_URL + "/newd", {
      params: { sortBy, sortOrder }, // Send sorting params in the request
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get Newd (public data)
export const getNewd = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/newd/" + _id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// add new Newd (admin api)
export const addNewNewd = async (name, detial, image, token) => {
  try {
    const response = await axios.post(
      API_URL + "/newd",
      {
        name: name,
        detial: detial,
        image: image,
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
export const editNewd = async (_id, name, detial, image, token) => {
  try {
    const response = await axios.put(
      API_URL + "/newd/" + _id,
      {
        name: name,
        detial: detial,
        image: image,
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
    const response = await axios.delete(API_URL + `/newd/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
