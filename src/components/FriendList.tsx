import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

export default function FriendList({
  minAge,
  maxAge,
}: {
  minAge: number;
  maxAge: number;
}) {
  const friends = useLiveQuery(async () => {
    const friends = await db.friends
      .where("age")
      .between(minAge, maxAge)
      .toArray();
    return friends;
  }, [minAge, maxAge]);

  return (
    <>
      <p>friend list</p>
      <ul>
        {friends?.map((friend) => (
          <li key={friend.id}>
            {friend.name}, {friend.age}
          </li>
        ))}
      </ul>
    </>
  );
}
