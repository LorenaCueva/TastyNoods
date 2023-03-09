function Login(){
    return(
        <div className="hero is-fullheight is-primary">
            <div className="hero-body">
            <div className="has-text-centered">
                <div className="columns">
                <div className="column is-half is-offset-one-quarter">
                    <h3 className="title has-text-white">Login</h3>
                    <p className="subtitle has-text-white">Please login to see our cool stuff!</p>
                    <div className="box">
                    <img id="panda" src="https://static.vecteezy.com/system/resources/previews/000/599/203/original/vector-panda-logo-black-and-white-head.jpg" style={{width: "60%"}}/>
                    <div className="title has-text-grey is-5">Please enter your email and password.</div>
                    <form>
                        <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="username" placeholder="Username"/>
                            <span className="icon is-small is-left">
                            <i className="material-icons">person</i>
                            </span>
                        </p>
                        </div>
                        <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" placeholder="Password"/>
                            <span className="icon is-small is-left">
                            <i className="material-icons">lock</i>
                            </span>
                        </p>
                        </div>
                        <label htmlFor="remember">
                        <input type="checkbox"/>Remember me
                        </label>
                        <button className="button is-block is-danger is-large is-fullwidth">Login</button>
                    </form>
                    <div/>
                </div>
                <p className="has-text-grey">
                    <a href="">Sign Up</a>
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Login;