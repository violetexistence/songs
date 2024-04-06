import { count } from "drizzle-orm";
import { db } from "./index";
import { people } from "./schema";

async function seed() {
  const rowCount = await db.select({ count: count() }).from(people)
  if (rowCount[0].count === 0) {  
    await db.insert(people).values([{
      name: 'Rowan',
      notes: 'Heir to the Arling of Redcliffe'
    },{
      name: 'Rendorn Guerrin',
      notes: 'Arl of Redcliffe'
    },{
      name: 'Jeka',
      notes: 'A casteless'
    }])  
    console.log('Seeding complete.')
  }
}

seed().catch(reason => {
  console.error(reason)
})