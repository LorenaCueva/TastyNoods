function NoodCard({nood}){
    return(
        <section className ="section is-clickable" onClick={()=>console.log(nood.id)}>
            <div className="columns">
                <div className="column">
                    {/* <div className="card">
                        <div className="card-content">
                            <div className="content">
                                <p className="title">{nood.brand}</p>
                                <p className="subtitle">{nood.flavor}</p>
                            </div>
                        </div>
                    </div> */}
                    <div className="tile is-ancestor">
  <div className="tile is-parent">
    <article className="tile is-child">
      <div className="content">
      <figure className="image is-4by3">
            <img src="../ramen1.png"/>
          </figure>
        
      </div>
    </article>
  </div>
  <div className="tile is-parent is-8">
    <article className="tile is-child notification is-danger ">
      <p className="title">{nood.brand}</p>
      <p className="subtitle">{nood.flavor}</p>
      <div className="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
      </div>
    </article>
  </div>
</div>

{/* <div className="tile is-ancestor">
  <div className="tile is-parent">
    <article className="tile is-child card">
        <div className="card-image">
            <figure>
                <img alt="GFG image" 
                     height="100" 
                     src=
"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png"/>
            </figure>
        </div>
        <div className="card-content is-overlay">
            <h3 className="has-text-white">
                GeeksforGeeks Overlay content1
            </h3>
            <h3 className="tag">GeeksforGeeks Overlay content2</h3>
            <br/><br/>
        </div>
    </article>
  </div>
</div> */}


                </div>
            </div>
        </section>
    )
}
export default NoodCard;