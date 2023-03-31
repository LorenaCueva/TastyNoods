import ReactStars from "react-stars";


function NoodCard({nood, onClick, onDeleteNood}){



  function handleCardClick(id){
    onClick(id)
  }

  async function handleAddToPantryClick(){
    console.log(nood.id)
    const response = await fetch('/pantry', {
      method: "POST",
      headers:{"Content-Type" : "application/json"},
      body: JSON.stringify({nood_id: nood.id})
    })
    const data = await response.json();
    if(response.ok){
      console.log(data)
    }
    else{
      console.log(data.errors)
    }
  }

    return(


  <div>
  <div style={{ position: 'relative' }}>
    <i
    className="material-icons is-clickable"
    style={{ position: 'absolute', top: 0, right: 40 }}
    onClick={handleAddToPantryClick}>add
    </i>
  <section className="section is-clickable" onClick={() => handleCardClick(nood.id)}>
  <div className="columns">
    <div className="column">
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child">
            <div className="content">
              <figure className="image is-4by3">
                <img src="../ramen1.png" alt={`Image of ${nood.brand} ${nood.flavor}`}/>
              </figure>
            </div>
          </article>
        </div>
        <div className="tile is-parent is-8">
          <article className="tile is-child notification is-danger">
            <p className="subtitle">{nood.nood_type.toUpperCase()}</p>
            {/* <br/> */}
            <p className="title">{nood.brand}</p>
            <p className="subtitle">{nood.flavor}</p>
            <p>{nood.short_notes}</p>
            <br/>
            <div className="content">
            <p className="subtitle"> Overall Rating</p>
            <div className="is-centered">
                  <ReactStars
                  count={5}
                  edit={false}
                  value={Number(nood.overall_rating)}
                  size={40}
                  />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</section>
</div>




        </div> 
        //     </div>
        // </section>
    )
}
export default NoodCard;