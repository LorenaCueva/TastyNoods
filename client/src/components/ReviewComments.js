import { useState, useEffect } from "react";
import CommentsCard from "./CommentsCard";



function ReviewComments({item}){

    const [comments, setComments] = useState([]);

    useEffect(()=>{
        fetch('/comments')
        .then(r => r.json())
        .then(data => setComments(data))
        .catch(error => console.log(error))
    },[])

    function handleCommentReviewed(id){
        const newComments = comments.filter(comment => comment.id !== id)
        setComments(newComments);
    }

    const commentsToRender = comments.map(item => <CommentsCard item={item} onCommentReviewed={handleCommentReviewed} key={item.id}/>)


    return(
        <div style={{ height: "100vw" }}>
             {commentsToRender.length > 0 ? 
            <div>
                <h1 className="title">Review Comments</h1>
           
           <div className="columns is-multiline">
               {commentsToRender}
           </div>
            </div>
            :
            <div>
                <h1 className="title has-text-centered" style={{ color: "orange" }}>No comments to review</h1>
            </div>
            }
        </div>
    )

    
      
}
export default ReviewComments;