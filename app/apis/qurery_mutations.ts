import { LoginType } from "@/components/login/Main";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
export type DataPush = {
  search?: string;
  lead_status_id?: any[];
  source_id?: any[];
  user_id?: any[];
  contacted_date_from?: string;
  contacted_date_to?: string;
};
export let BASE_URL = "https://crm.softvalley.sveducrm.com/api/admin";
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://soft-valley-task.vercel.app",
  },
  // withCredentials:true
});

export let useLogin = () =>
  useMutation({
    mutationFn: async (values: LoginType) => await api.post(`/login`, values),
  });

export let useList = (query: string, filter: object) => {
  const config = {
    headers: {
  
      Authorization: `Bearer ${getCookie("auth")}`,
    },
  };
  return useQuery({
    queryKey: ["Lead_list", query, filter],
    queryFn: async () => {
      let { data } = await api.post(
        `/lead/list?page=1&limit=10`,
        {
          search: query,
          ...filter,
        },
        config
      );
      return data.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGeFilters = (path: string, key: string[]) => {
  const config = {
    headers: {
     
      Authorization: `Bearer ${getCookie("auth")}`,
    },
  };
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      let { data } = await api.get(path, config);
      return data.data;
    },
    refetchOnWindowFocus: false,

    retry: false,
  });
};
