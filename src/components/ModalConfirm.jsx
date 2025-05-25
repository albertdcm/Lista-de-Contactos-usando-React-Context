import { useState } from "react";

export default function ModalConfirm({ onConfirm, children }) {
  const [show, setShow] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setShow(false);
  };

  return (
    <>
      <span onClick={() => setShow(true)}>{children}</span>
      {show && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this contact?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleConfirm}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}