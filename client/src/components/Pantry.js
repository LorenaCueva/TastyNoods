import { UserContext } from "./UserContext";
import { useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'


// const onComplete = data=> console.log(data)



function Pantry(){

    const { user } = useContext(UserContext);
    const [pantry, setPantry] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function fetchPantry(){
        const response = await fetch('/pantry')
        const data = await response.json();
        if(response.ok){
            setPantry(data);
        }
        else{
            console.log(data.errors)
        }
    }

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
        else{
            fetchPantry();
        }
    },[])

    function handleFileSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const fileData = new FormData();
        selectedImages.forEach((image) => fileData.append("pictures[]", image));
        fetch(`/noods/5/pictures`, {
          method: "PATCH",
          body: fileData,
        })
          .then((r) => r.json())
          .then((data) => {
            console.log(data);
                setLoading(false)
          })
          .catch((error) => console.log(error));
      }

  const onFileChange = (event) => {
    setSelectedImages([...selectedImages, ...event.target.files]);
  };

  const onRemoveImage = (index) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  };

  return (
    <div>
      <div className="tile is-ancestor mb-5">
        {selectedImages.map((image, index) => (
          <div key={index} className="tile is-parent">
            <div className="tile is-child">
            <button className="delete " onClick={() => onRemoveImage(index)}></button>
              <figure className="image is-128x128">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Selected image ${index + 1}`}
                />
              </figure>
            </div>
          </div>
        ))}
      </div>
      <form encType="multipart/form-data" direct_upload="true">
        <div className="field">
          <label className="label">Select Images</label>
          {loading ? <progress className="progress is-danger mt-5" max="100"></progress> : null}
          <div className="file is-centered">
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
            </label>
          </div>
        </div>
        <div className="has-text-centered">
          <button className="button is-danger" onClick={handleFileSubmit}>
            Submit
          </button>
          </div>
      </form>
    </div>
   
              
         
);

  



    // const handleSubmit = async (files) => {
    //     const formData = new FormData();
    //     files.forEach((file) => {
    //       formData.append("pictures", file);
    //     });
    //     console.log(formData)
      
    //     try {
    //       const response = await fetch("/noods/5/pictures", {
    //         method: "PATCH",
    //         body: formData,
    //       });
    //       const data = await response.json();
    //       console.log(data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    // const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
  // called every time a file's `status` changes
//   const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  
  // receives array of files that are done uploading when submit button is clicked
//   const handleSubmit = (files) => { console.log(files.map(f => f.meta)) }

//   return (
//     <div>
//       <Dropzone
//       getUploadParams={getUploadParams}
//       onChangeStatus={handleChangeStatus}
//       onSubmit={handleSubmit}
//       accept="image/*"
//       encType="multipart/form-data"
//       directUpload="true"
//     />

// <form encType="multipart/form-data" direct_upload="true" >
//                             <label className="file-label">
                            
//                                 <>
//                                 <input className="file-input" type="file" name="avatar" direct_upload="true" accept="image/png, image/jpeg" multiple={true}/>
//                                 <span className="file-cta"> Select File</span>
                               
//                                 </>
                            
//                             </label>
//                             </form>

    
//     </div>
    
//   )
}
export default Pantry;