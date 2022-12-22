
import { User } from "./src/lib/server/db.js"

async function dbSync() {
  await User.sync({force: true})
}

dbSync()

