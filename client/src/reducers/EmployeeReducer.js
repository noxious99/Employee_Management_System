import React from "react";

const initialState = {
  isLoading: false,
  allData: [],
  totalCount: 0,
};

export const getReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_SUCCESS":
      return {
        isLoading: false,
        allData: action.payload.allEmployee,
        totalCount: action.payload.totalEmployeeCount,
      };
    case "GET_FAILED":
      return {
        isLoading: false,
        allData: action.payload,
      };
    case "UPDATE_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_SUCCESS":
      return {
        isLoading: false,
        allData: state.allData.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
        totalCount: state.totalCount,
      };
    case "UPDATE_FAILED":
      return {
        isLoading: false,
        allData: action.payload,
      };
    case "DELETE_LOADING":
      return {
        ...state,
        deleteLoading: true,
      };
    case "DELETE_SUCCESS":
      return {
        deleteLoading: false,
        allData: state.allData.filter(
          (user) => user._id !== action.payload._id
        ),
        totalCount: state.totalCount,
      };
    case "DELETE_FAILED":
      return {
        deleteLoading: false,
      };
    default:
      return state;
  }
};
