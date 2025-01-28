import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "sonner";

// (public api)
export const getPlayers = async (searchQuery = "") => {
    try {
      // Add the search query to the request if it's provided
      const response = await axios.get(API_URL + "/players", {
        params: { search: searchQuery },  // Pass the search query as a query parameter
      });
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "An error occurred while fetching players.");
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
export const addNewPlayer = async (name, token) => {
  try {
    const response = await axios.post(
      API_URL + "/players",
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

// update Player (admin api)
export const editPlayer = async (_id, name, token) => {
  try {
    const response = await axios.put(
      API_URL + "/players/" + _id,
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

// delete Player (admin api)
export const deletePlayer = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + `/players/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
