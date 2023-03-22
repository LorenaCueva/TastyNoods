import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PicturesForm from "./PicturesForm";

function ImageUploadModal({noodId, openModal, toggleOpenModal}){

    const [imageUploadIsSucces, setImageUploadIsSuccess] = useState(null);
    const navigate = useNavigate();

    return(
        <div>
            <div className={`modal ${openModal ? "is-active": ""} has-text-centered`}>
            {/* <div className="modal is-active has-text-centered"> */}
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head ">
                <p className="modal-card-title">Oh My, Nood Added</p>
                <button className="delete" aria-label="close" onClick={toggleOpenModal}></button>
                </header>
                <section className="modal-card-body">
                {imageUploadIsSucces == null ? null :
                <p className={`has-text-centered ${imageUploadIsSucces ? 'has-text-success' : 'has-text-danger'}`}>
                    {imageUploadIsSucces ? "NOOD PICS ADDED!" : "OOPS, THERE WAS A PROBLEM. PLEASE TRY AGAIN"}
                </p>}
                {imageUploadIsSucces ? null : <PicturesForm noodId={noodId} uploadSuccess={setImageUploadIsSuccess}/>}
                </section>
                {imageUploadIsSucces &&
                <footer className="modal-card-foot">
                    <button className="button is-danger" onClick={toggleOpenModal}>Add Another Nood</button>
                    <button className="button is-danger" onClick={()=>navigate('/noods')}>Go to Noods</button>
                </footer>}
                {imageUploadIsSucces === false && <footer className="modal-card-foot"><button className="button is-danger">Try Later</button></footer>}
                {imageUploadIsSucces === null && null}
            </div>
            </div>
        </div>
    )
}
export default ImageUploadModal;