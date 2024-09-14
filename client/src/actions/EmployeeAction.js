import axios from "axios";

export const getEmployee = (page, sortField, order,searchParams) => async (dispatch) => {
  dispatch({ type: "GET_LOADING " });
  try {

    const query = new URLSearchParams({
      page,
      sortBy: sortField,
      order,
      nameKey: searchParams.nameKey || "",
      emailKey: searchParams.emailKey || "",
      mobileKey: searchParams.mobileKey || "",
      dobKey: searchParams.dobKey || ""
    }).toString();

    const response = await axios.get(
      `http://localhost:8080/api/?${query}`,
      {}
    );
    dispatch({ type: "GET_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_FAILED", payload: error.message });
  }
};

export const updateEmployee = (id, data) => async (dispatch) => {
  dispatch({ type: "UPDATE_LOADING" });
  try {
    const response = await axios.put(
      `http://localhost:8080/api/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "UPDATE_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "UPDATE_FAILED", payload: error.message });
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  dispatch({ type: "DELETE_LOADING " });
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/${id}`,
      {}
    );
    dispatch({ type: "DELETE_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "DELETE_FAILED", payload: error.message });
  }
};