 import { axiosConfig } from "@redux/store";
import axios from "axios";
import {
  GET_REPORTS_REQUEST,
  GET_REPORTS_SUCCESS,
  GET_REPORTS_FAIL,
  CREATE_REPORT_REQUEST,
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_FAIL,
  EDIT_REPORT_FAIL,
  EDIT_REPORT_REQUEST,
  EDIT_REPORT_SUCCESS,
  DELETE_REPORT_REQUEST,
  DELETE_REPORT_SUCCESS,
  DELETE_REPORT_FAIL,
  CLEAR_ERROR,
  CLEAR_REPORT_STATE,
} from "src/constants/actionTypes";
import { asyncHandler } from "@utils/asyncHandler";

const getReportsAsync = async () => {
    const { data } = await axios.get("/reports", axiosConfig);
    return data.reports;
    };

const addReportAsync = async (reportData) => {  
    const { data } = await axios.post(`${server}/reports/create`, reportData, axiosConfig);
    return data.report;
    };

const updateReportAsync = async (reportData) => {
    const { data } = await axios.put(`${server}/reports/edit/${reportData._id}`, reportData, axiosConfig);
    return data.report;
    }

const deleteReportAsync = async (reportId) => {
    await axios.delete(`${server}/reports/delete/${reportId}`, axiosConfig);
    return reportId;
    };

export const getReports = asyncHandler( getReportsAsync, GET_REPORTS_REQUEST, GET_REPORTS_SUCCESS, GET_REPORTS_FAIL );
export const addReport = asyncHandler( addReportAsync, CREATE_REPORT_REQUEST, CREATE_REPORT_SUCCESS, CREATE_REPORT_FAIL );
export const updateReport = asyncHandler( updateReportAsync, EDIT_REPORT_REQUEST, EDIT_REPORT_SUCCESS, EDIT_REPORT_FAIL );
export const deleteReport = asyncHandler( deleteReportAsync, DELETE_REPORT_REQUEST, DELETE_REPORT_SUCCESS, DELETE_REPORT_FAIL );
export const clearError = () => ({ type: CLEAR_ERROR });
export const clearReportState = () => ({ type: CLEAR_REPORT_STATE });

   