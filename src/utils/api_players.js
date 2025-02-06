import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "sonner";

// (public api)
export const getPlayers = async (searchTerm = "") => {
  try {
    const response = await axios.get(`${API_URL}/player?name=${searchTerm}`); 
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// get Player (public data)
export const getPlayer = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/player/" + _id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// add new Player (admin api)
export const addNewPlayer = async (name, image, token) => {
  try {
    const response = await axios.post(
      API_URL + "/player",
      {
        name: name,
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

// update Player (admin api)
export const editPlayer = async (_id, name, image, token) => {
  try {
    const response = await axios.put(
      API_URL + "/player/" + _id,
      {
        name: name,
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

// delete Player (admin api)
export const deletePlayer = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + `/player/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
