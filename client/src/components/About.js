import { titleColor, background } from "../Helpers";

function About(){
    return(
        <div style={{ height: "100vw" }}>
             <div className="hero" style={{ backgroundImage: background, height: "100vw" }}>
            <div className="hero-body">
            <div className="box">
            <div className="has-text-centered">
                <h3 className="title " style={{ color: titleColor }}>Welcome to Tasty Noods!</h3>
                <br/>
                <p className="is-size-5">
                    Are you someone who loves noodles but doesn't know which ones to try next?<br/>
                    Are you tired of taste-testing every brand and flavor out there? Look no further!<br/><br/>
                    Tasty Noods is a platform that provides instant noodle reviews of noods from around the world, so you can explore different cuisines and discover new favorites.<br/><br/>
                    Our community of nood enthusiasts share their experiences with different brands and flavors, giving you the inside scoop on what's worth trying.<br/><br/>
                    Not only can you read reviews, but you can also create a personal pantry of the noods you've tried and loved.<br/><br/>
                    Rate, comment and enjoy!
                </p>
                <hr className="is-divider"/>
                <h3 className="title " style={{ color: titleColor }}>How to:</h3>
                <p className="is-size-5">Add Noods to your pantry with the <i className="material-icons">add</i> button
                <br/><br/>
                Comment and Rate noods in your pantry
                </p>
                <hr className="is-divider"/>
                <h3 className="title" style={{ color: titleColor }}>Comment and Rating Policy</h3><br/>
                <p className="is-size-5">We take our comments and ratings seriously. <br/><br/>
                Our team of admins are constantly monitoring the comments section to ensure that everything stays tasty and respectful.<br/><br/>
                If we spot anything that looks out of place, we'll take care of it faster than you can slurp up a bowl of our delicious noodles.<br/>
                We strive to maintain fairness and balance in our reviews (just like our delicious noods!)</p>
            </div>
            </div>
            </div>
            </div>
        </div>
    )
}
export default About;