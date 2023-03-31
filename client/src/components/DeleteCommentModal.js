import { useState } from "react";

function DeleteCommentModal({item, onDelete, onCancelDelete}) {

  const [modalIsOpen, setModalIsOpen] = useState(true);

  function handleDeleteItem(){
    fetch(`/comments/${item.id}`, {
        method: "DELETE"
      })
      .then(onDelete(item.id))
      .catch(error => console.log(error))
       setModalIsOpen(false);
       onDelete(item.id);
  }

  function handleCancelModal(){
    setModalIsOpen(false);
    onCancelDelete();
  }

  console.log(item)

  return (
    <div className={`modal ${modalIsOpen ? "is-active": ""} has-text-centered`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head has-text-danger">
          <p className="modal-card-title">Delete Comment from Nood?</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleCancelModal}
          ></button>
        </header>
        <section className="modal-card-body">
            <div className="content">
          <p>
            Are you sure you want to delete comments and rating?
          </p>
          <blockquote>{item.comments}</blockquote>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={handleDeleteItem}>
            Delete
          </button>
          <button className="button" onClick={handleCancelModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

export default DeleteCommentModal;
