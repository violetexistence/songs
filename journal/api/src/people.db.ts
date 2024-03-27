import { Database, SQLQueryBindings } from 'bun:sqlite'

export interface Person {
  id: number
  name: string
  notes?: string | null
  avatar?: string | null
}

export class PeopleDatabase {
  private db: Database

  constructor() {
    this.db = new Database('person.db')
    this.init()
        .then(() => console.log('Database initialized'))
        .catch(console.error)
  }

  async getPeople() {
    return this.db.query<Person, SQLQueryBindings[]>('SELECT * FROM people').all()
  }

  async addPerson(person: Omit<Person, 'id'>) {
    const sql = 'INSERT INTO people (name, notes, avatar) VALUES (?, ?, ?) RETURNING *'
    const createdPerson = this.db.query<Person, SQLQueryBindings[]>(sql)
                                 .get(person.name, person.notes || null, person.avatar || null)


    if (createdPerson !== null) {
      return createdPerson
    }

    throw new Error('Db query did not return any data.')
  }

  async updatePerson(person: Person) {
    const sql = 'UPDATE people SET name = ?, notes = ?, avatar = ? WHERE id = ?'
    return this.db.run(sql, [
      person.name, 
      person.notes || null, 
      person.avatar || null, 
      person.id || null
    ])
  }

  async deletePerson(id: number) {
    const sql = 'DELETE FROM people WHERE id = ?'
    return this.db.run(sql, [id])
  }

  async getPerson(id: number) {
    const sql = 'SELECT * FROM people WHERE id = ?'
    return this.db.query<Person, SQLQueryBindings[]>(sql).get(id) as Person
  }

  async init() {
    const sql = 'CREATE TABLE IF NOT EXISTS people (' +
      'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'name TEXT NOT NULL, ' +
      'notes TEXT, ' +
      'avatar TEXT)'

    return this.db.run(sql)
  }
}