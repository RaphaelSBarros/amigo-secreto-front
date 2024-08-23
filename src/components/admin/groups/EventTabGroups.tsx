import { Group } from "@/types/Group"
import { useEffect, useState } from "react"
import * as api from '@/api/admin'
import { GroupItemNotFound, GroupItemPlaceholder } from "./GroupItem"

type Props = {
  eventId: number
}
export const EventTabGroups = ({ eventId }: Props) => {
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true);

  const loadGroups = async () => {
    setLoading(true);
    const groupList = await api.getGroups(eventId);
    setLoading(false);
    setGroups(groupList)
  }

  useEffect(() => {
    loadGroups();
  }, [])

  return (
    <div>
      <div>add/edit</div>

      {!loading && groups.length > 0 && groups.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      {loading &&
        <>
          <GroupItemPlaceholder />
          <GroupItemPlaceholder />
        </>
      }
      {!loading && groups.length === 0 && <GroupItemNotFound /> }
    </div>
  )
}