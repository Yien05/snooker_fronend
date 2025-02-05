import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

// (public api)
export const getMatches = async () => {
  try {
    const response = await axios.get(API_URL + "/matche");
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

// add new Matche (admin api)
export const addNewMatche = async (
  name1,
  name2,
  date,
  time,
  image1,
  image2,
  token
) => {
  try {
    const response = await axios.post(
      API_URL + "/matche",
      {
        name1: name1,
        name2: name2,
        date: date,
        time: time,
        image1: image1,
        image2: image2,
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

// update Matche (admin api)
export const editMatche = async (
  _id,
  name1,
  name2,
  date,
  time,
  image1,
  image2,
  token
) => {
  try {
    const response = await axios.put(
      API_URL + "/matche/" + _id,
      {
        name1: name1,
        name2: name2,
        date: date,
        time: time,
        image1: image1,
        image2: image2,
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

// delete Matche (admin api)
export const deleteMatche = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + `/matche/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
