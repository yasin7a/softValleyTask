import { LoginType } from "@/components/login/LoginMain";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export let BASE_URL = "https://crm.softvalley.sveducrm.com/api";
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export let useLogin = () =>
  useMutation({
    mutationFn: async (values: LoginType) =>
      await api.post(`/admin/login`, values),
  });
