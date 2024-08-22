"use client";

import * as api from "@/api/admin";
import { Event } from "@/types/Event";
import { useEffect, useState } from "react";

export const AdminPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const loadEvents = async () => {
    setLoading(true);
    const eventList = await api.getEvents();
    setLoading(false);
    setEvents(eventList);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div>
      <div className="p-3 flex items-center">
        <h1 className="text-2xl flex-1">Eventos</h1>
        <div>...</div>
      </div>
      <div className="my-3">
        {!loading &&
          events.length > 0 &&
          events.map((item) => <div key={item.id}>{item.title}</div>)}
        {!loading && events.length === 0 && <div>Nada encontrado</div>}
        {loading && <div>Carregando...</div>}
      </div>
    </div>
  );
};
