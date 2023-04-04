import { useState } from "react";
import PicturesForm from "./PicturesForm";
import { useNavigate } from "react-router-dom";

function ImageUploadModal({noodId, openModal, toggleOpenModal, clearForm, isEdit, onCancel, onUpdatePictures}){

    const [imageUploadIsSucces, setImageUploadIsSuccess] = useState(null);
    const navigate = useNavigate();

    return(
        <div>
            <div className={`modal ${openModal ? "is-active": ""} has-text-centered`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head ">
                <p className="modal-card-title">Oh My, {isEdit ? "Nood, Edited" : "Nood Added"}</p>
                </header>
                <section className="modal-card-body">
                {imageUploadIsSucces == null ? null :
                <p className={`has-text-centered ${imageUploadIsSucces ? 'has-text-success' : 'has-text-danger'}`}>
                    {imageUploadIsSucces ? "NOOD PICS ADDED!" : "OOPS, THERE WAS A PROBLEM. PLEASE TRY AGAIN"}
                </p>}
                {imageUploadIsSucces ? null : <PicturesForm noodId={noodId} uploadSuccess={setImageUploadIsSuccess} clearForm={clearForm} isEdit={isEdit} onUpdatePictures={onUpdatePictures}/>}
                </section>
                {imageUploadIsSucces &&
                <footer className="modal-card-foot">
                    {isEdit ? <button className="button is-danger" onClick={()=>{
                        toggleOpenModal()
                        onCancel();
                        }}>Go to Nood</button> : 
                        <div>
                             <button className="button is-danger" onClick={toggleOpenModal}>Add Another Nood</button>
                             <button className="button is-danger" onClick={()=> {toggleOpenModal(); navigate('/noods')}}>Go to Noods</button>
                        </div>
                       }
                </footer>}
                {imageUploadIsSucces === false && <footer className="modal-card-foot"><button className="button is-danger" onClick={toggleOpenModal}>Try Later</button></footer>}
                {imageUploadIsSucces === null && null}
            </div>
            </div>
        </div>
    )
}
export default ImageUploadModal;