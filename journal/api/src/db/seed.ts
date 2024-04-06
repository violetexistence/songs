import { count } from "drizzle-orm";
import { db } from "./index";
import { people } from "./schema";
import { locations } from "./schema";

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

const locationsRowCount = await db.select({ count: count() }).from(locations);
if (locationsRowCount[0].count === 0) {
  await db.insert(locations).values([
    {
      name: 'Redcliffe',
      notes: 'Coordinates: 123.456, 789.012, The Arl of Redcliffe, Rendorn Guerrin, is important to Ferelden.',
    },
    {
      name: 'Denerim',
      notes: 'Coordinates: 345.678, 901.234. The capital of Ferelden.',
    },
    {
      name: 'Orzammar',
      notes: 'Coordinates: 567.890, 123.456. The famous dwarven city.',
    },
  ]);

  console.log('Location seeding complete.');
}

seed().catch(reason => {
  console.error(reason)
})