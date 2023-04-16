import { LoginType } from "@/components/login/Main";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
export type DataPush = {
  search?: string;
  lead_status_id?: never[];
  source_id?: never[];
  user_id?: never[];
  contacted_date_from?: string;
  contacted_date_to?: string;
};
export let BASE_URL = "https://crm.softvalley.sveducrm.com/api/admin";
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${getCookie("auth")}`,
  },
  withCredentials: true,
});

export let useLogin = () =>
  useMutation({
    mutationFn: async (values: LoginType) => await api.post(`/login`, values),
  });

export let useList = (values: DataPush | undefined | null, query: string) =>
  useQuery({
    queryKey: ["Lead_list", query],
    queryFn: async () => {
      let { data } = await api.post(`/lead/list?page=1&limit=10`, values);
      return data.data.data;
    },
    retry: false,
  });

export const useGetStatus = () =>
  useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      let { data } = await api.get(`/base/lead-status`);
      return data.data;
    },

    retry: false,
  });

export const useGetAssign = () =>
  useQuery({
    queryKey: ["assign"],
    queryFn: async () => {
      let { data } = await api.get(`/base/assignee`);
      return data.data;
    },

    retry: false,
  });

export const useGetSource = () =>
  useQuery({
    queryKey: ["source"],
    queryFn: async () => {
      let { data } = await api.get(`/base/source`);
      return data.data;
    },
    retry: false,
  });