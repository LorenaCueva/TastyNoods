import { useState, useEffect } from "react";

function PicturesForm({noodId, uploadSuccess, isEdit, clearForm, onUpdatePictures}){

    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(clearForm && !noodId){setSelectedImages([])}
    // eslint-disable-next-line
    },[clearForm])

    async function handleFileSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const fileData = new FormData();
        selectedImages.forEach(image => {
            if(typeof image != "string"){
                fileData.append("pictures[]", image)
            }})
        if (selectedImages.every(element => typeof element === "string")) {
            setLoading(false);
            uploadSuccess(true)
        }
        else {
            const response = await fetch(`/noods/${noodId}/pictures`, {
          method: "PATCH",
          body: fileData,
            })
            const data = await response.json();
            if(response.ok){
                onUpdatePictures(data);
                setLoading(false);
                uploadSuccess(true);
            }
            else{
                uploadSuccess(false);
                setLoading(false);
            }

            }
    }
    
      useEffect(() => {
        async function fetchNoodPictures() {
            const response = await fetch(`/noods/${isEdit}/pictures`);
            const data = await response.json();
            if (response.ok && data.pictures) {
                    setSelectedImages(data.pictures)
            } 
        }
        if (isEdit) {
            fetchNoodPictures();
        }
    }, [isEdit]);

    function onFileChange(e){
        setSelectedImages([...selectedImages, ...e.target.files]);
    };

    function onRemoveImage(index){
        if(isEdit && typeof selectedImages[index] == "string"){
            purgeImage(index);
        }
        const newSelectedImages = [...selectedImages];
        newSelectedImages.splice(index, 1);
        setSelectedImages(newSelectedImages);
    };

    function purgeImage(index){
        fetch(`/noods/${isEdit}/pictures`,{
            method: "DELETE",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({pictures: index})
        })
        .catch(error => console.log(error))
    }

    return(
    <div>
        <div className="section">
        <label className="label has-text-centered">{isEdit ? "Nood Pics" : "Add 3 Nood Pics"}<span className="is-size-7 has-text-grey"> (1 Package, 1 Contents, 1 Prepared)</span></label>
      <div className="tile is-ancestor mb-5 ">
        {selectedImages !== null ? selectedImages.map((image, index) => (
          <div key={index} className="tile is-parent">
            <div className="tile is-child">
              <figure className="image is-96x96">
                {typeof image == "string" ? <img
                  src={image}
                  alt={`Pic ${index + 1}`}
                /> : <img
                  src={URL.createObjectURL(image)}
                  alt={`Pic ${index + 1}`}
                />}
                <span className="delete " onClick={() => {
                    onRemoveImage(index)}}></span>
              </figure>
            </div>
          </div>
        )): null}
      </div>
      </div>
      <div className="section">
      <form encType="multipart/form-data" direct_upload="true">
        <div className="field">
          {loading ? <progress className="progress is-danger mt-5" max="100"></progress> : null}
          <div className="file is-centered">
          {selectedImages && selectedImages.length < 3?
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="pictures"
                accept="image/png, image/jpeg"
                multiple={true}
                onChange={onFileChange}
              />
              <span className="file-cta">
                <span className="file-icon">
                <i className="material-icons">upload</i>
                </span>
                <span className="file-label">Choose images</span>
              </span>
              <span className="file-name">
                {selectedImages.length} files selected
              </span>
            </label>: null}
          
          </div>
        </div>
        {loading || selectedImages.length !== 3 ? null :
          <button className="button is-danger" onClick={handleFileSubmit}>
            Choose Images
          </button>}   
      </form>
    </div>
    </div>
    )
}
export default PicturesForm;