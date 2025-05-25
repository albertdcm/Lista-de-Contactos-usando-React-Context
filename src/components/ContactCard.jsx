import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ModalConfirm from "../components/ModalConfirm";

export default function ContactCard({ contact }) {
  const { dispatch } = useGlobalReducer();

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contact.id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      dispatch({ type: "DELETE_CONTACT", payload: contact.id });
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("No se pudo eliminar el contacto.");
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title">{contact.full_name}</h5>
          <p className="card-text">{contact.email}</p>
          <p className="card-text">{contact.phone}</p>
          <p className="card-text">{contact.address}</p>
        </div>
        <div>
          <Link to={`/edit/${contact.id}`} className="btn btn-primary me-2">
            Edit
          </Link>
          <ModalConfirm onConfirm={handleDelete}>
            <button className="btn btn-danger">Delete</button>
          </ModalConfirm>
        </div>
      </div>
    </div>
  );
}