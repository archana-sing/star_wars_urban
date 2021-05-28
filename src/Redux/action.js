import * as getActions from "./actionTypes";
import axios from "axios";

const getRequest = () => {
  return {
    type: getActions.GET_REQUEST,
  };
};

const getSuccess = (payload) => {
  return {
    type: getActions.GET_SUCCESS,
    payload,
  };
};

const getFailure = (error) => {
  return {
    type: getActions.GET_FAILURE,
    error: error,
  };
};
export const getPeople = (query) => (dispatch) => {
  dispatch(getRequest());
  return axios
    .get("https://swapi.dev/api/people")
    .then((res) => {
       dispatch(getSuccess(res.data.results));
    })
    .catch((err) => {
      dispatch(getFailure(err));
    });
};
