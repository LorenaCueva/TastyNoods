import { useState, useEffect } from "react";

function PicturesForm({noodId, uploadSuccess}){

    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleFileSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const fileData = new FormData();
        selectedImages.forEach((image) => fileData.append("pictures[]", image));
        const response = await fetch(`/noods/${noodId}/pictures`, {
          method: "PATCH",
          body: fileData,
        })
        const data = await response.json();
        if(response.ok){
            console.log(data);
            setLoading(false);
            uploadSuccess(true);
        }
        else{
            console.log(data)
            uploadSuccess(false);
            setLoading(false)
        }
      }

    function onFileChange(e){
        setSelectedImages([...selectedImages, ...e.target.files]);
        // onImageChange([...selectedImages, ...e.target.files])
    };

    function onRemoveImage(index){
        const newSelectedImages = [...selectedImages];
        newSelectedImages.splice(index, 1);
        setSelectedImages(newSelectedImages);
        // onImageChange(newSelectedImages)
    };

    return(
    <div>
        <div className="section">
        <label className="label has-text-centered">Add Nood Pics<span className="is-size-7 has-text-grey"> (Package, contents, prepared)</span></label>
      <div className="tile is-ancestor mb-5 ">
        {selectedImages.map((image, index) => (
          <div key={index} className="tile is-parent">
            <div className="tile is-child">
              <figure className="image is-96x96">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Selected image ${index + 1}`}
                />
                <span className="delete " onClick={() => onRemoveImage(index)}></span>
              </figure>
            </div>
          </div>
        ))}
      </div>
      </div>
      <div className="section">
      <form encType="multipart/form-data" direct_upload="true">
        <div className="field">
          {loading ? <progress className="progress is-danger mt-5" max="100"></progress> : null}
          <div className="file is-centered">
          {selectedImages.length < 3 ?
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
        {loading || selectedImages.length < 3 ? null :
        <div className="has-text-centered">
          <button className="button is-danger" onClick={handleFileSubmit}>
            Upload Images
          </button>
          </div>
        }   
      </form>
    </div>
    </div>
    )
}
export default PicturesForm;