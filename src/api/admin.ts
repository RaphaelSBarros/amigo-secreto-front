import { getCookie } from "cookies-next";
import { req } from "./axios";
import { Event } from "@/types/Event";
import { Group } from "@/types/Group";

export const login = async (password: string) => {
  try {
    const json = await req.post("/admin/login", { password });
    return (json.data.token as string) ?? false;
  } catch (err) {
    return false;
  }
};

export const getEvents = async () => {
  const token = getCookie("token");
  console.log(token);
  const json = await req.get("/admin/events", {
    headers: { Authorization: `Token ${token}` },
  });
  return (json.data.events as Event[]) ?? [];
};

type AddEventData = {
  title: string;
  description: string;
  grouped: boolean;
};
export const addEvent = async (data: AddEventData): Promise<Event | false> => {
  const token = getCookie("token");
  const json = await req.post(`/admin/events`, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return (json.data.event as Event) ?? false;
};

type UpdateEventData = {
  title?: string;
  description?: string;
  grouped?: boolean;
  status?: boolean;
};
export const updateEvent = async (
  id: number,
  data: UpdateEventData
): Promise<Event | false> => {
  const token = getCookie("token");
  const json = await req.put(`/admin/events/${id}`, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return (json.data.event as Event) ?? false;
};

export const deleteEvent = async (id: number) => {
  const token = getCookie("token");
  const json = await req.delete(`/admin/events/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });
  return !json.data.error;
};

export const getGroups = async (eventId: number) => {
  const token = getCookie("token");
  const json = await req.get(`/admin/events/${eventId}/groups`, {
    headers: { Authorization: `Token ${token}` },
  });
  return (json.data.groups as Group[]) ?? [];
};

type AddGroupData = {
  name: string;
};
export const addGroup = async (
  eventId: number,
  data: AddGroupData
): Promise<Group | false> => {
  const token = getCookie("token");
  const json = await req.post(`/admin/events/${eventId}/groups/`, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return (json.data.group as Group) ?? false;
};

type UpdateGroupData = {
  name: string;
};
export const updateGroup = async (
  eventId: number,
  id: number,
  data: UpdateGroupData
): Promise<Group | false> => {
  const token = getCookie("token");
  const json = await req.put(`/admin/events/${eventId}/groups/${id}`, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return (json.data.group as Group) ?? false;
};

export const deleteGroup = async (eventId: number, id: number) => {
  const token = getCookie('token');
  const json = await req.delete(`/admin/events/${eventId}/groups/${id}`, {
    headers: {Authorization:`Token ${token}`}
  })
  return !json.data.error;
}