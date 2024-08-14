import { req } from "@/api/axios";
import { Event } from "@/types/Event";

export const getEvent = async (id: number): Promise<Event | false> => {
  const json = await req.get(`admin/events/${id}`);
  return (json.data.event as Event) ?? false;
};
