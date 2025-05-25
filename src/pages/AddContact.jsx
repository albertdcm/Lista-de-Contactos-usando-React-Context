import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function AddContact() {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const [contact, setContact] = useState({
    full_name: "",
    email: "",
    address: "",
    phone: "",
    agenda_slug: "albert_agenda"
  });

  useEffect(() => {
    if (id) {
      const existing = store.contacts.find((c) => c.id === parseInt(id));
      if (existing) setContact({ ...existing, agenda_slug: "albert_agenda" });
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `https://playground.4geeks.com/apis/fake/contact/${id}`
        : "https://playground.4geeks.com/apis/fake/contact/";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      dispatch({
        type: method === "POST" ? "ADD_CONTACT" : "UPDATE_CONTACT",
        payload: data
      });
      navigate("/contacts");
    } catch (err) {
      console.error("Error saving contact:", err);
      alert("Error guardando contacto. Revisa los datos y conexión.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Contact" : "Add Contact"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="full_name"
            value={contact.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={contact.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
}