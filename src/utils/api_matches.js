import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "sonner";

// (public api)
export const getMatches = async () => {
  try {
    const response = await axios.get(API_URL + "/matches");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get Matche (public data)
export const getMatche = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/matche/" + _id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// add new Newd (admin api)
export const addNewMatche = async (name1,name2,date,score1,score2,time, token) => {
  try {
    const response = await axios.post(
      API_URL + "/newds",
      {
        name1: name1,
        name2:name2,
        date:date,
        score1:score1,
        score2:score2,
        time:time,
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
