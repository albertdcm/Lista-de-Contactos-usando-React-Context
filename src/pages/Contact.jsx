import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";
import { Link } from "react-router-dom";

export default function Contact() {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/albert_agenda");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        dispatch({ type: "SET_CONTACTS", payload: data });
      } catch (error) {
        console.error("Error fetching contacts:", error);
        alert("No se pudieron cargar los contactos. Verifica tu conexión.");
      }
    };
    fetchContacts();
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Contacts</h2>
        <Link to="/contacts/add" className="btn btn-success">
          Add Contact
        </Link>
      </div>
      {store.contacts.length === 0 ? (
        <p className="text-muted">No contacts found. Add one!</p>
      ) : (
        store.contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      )}
    </div>
  );
}