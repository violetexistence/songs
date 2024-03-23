import { useLocalStorage } from "../storage/local";

export type Contact = {
  id: number;
  name: string;
  abstract?: string;
  avatar?: string;
};

const initialValue: Contact[] = []

export function useContacts() {
  const [contacts, saveAll] = useLocalStorage<Contact[]>('journal-contacts', initialValue)
  
  const create = () => {
    saveAll(contacts.concat({
      id: new Date().getTime(),
      name: 'New Card',
      abstract: 'Lorem ipsum dolor sit amet.'
    }))
  }

  const remove = (id: number) => {
    saveAll(contacts?.filter(c => c.id !== id))
  }

  const save = (existingContact: Contact) => {
    saveAll(contacts?.map(c => c.id === existingContact.id ? { ...c, ...existingContact} : c))
  }

  return {
    contacts,
    create,
    remove,
    save,
    saveAll
  }
}