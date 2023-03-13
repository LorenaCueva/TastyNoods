function NoodCard({nood}){
    return(
        <section className ="section">
            <h1>Nood</h1>
            <h1>{nood.brand}</h1>
            <h1>{nood.flavor}</h1>
        </section>
    )
}
export default NoodCard;