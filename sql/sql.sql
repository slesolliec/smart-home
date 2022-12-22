
-- view with current room temperatures
create or replace view rooms_current as 
select rooms.*,
  (select temp       from thermos where room_id = rooms.room_id order by created_at desc limit 1),
  (select hydro      from thermos where room_id = rooms.room_id order by created_at desc limit 1),
  (select created_at from thermos where room_id = rooms.room_id order by created_at desc limit 1)
from rooms;


