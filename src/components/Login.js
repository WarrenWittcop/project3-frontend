
import { useState } from "react"

const Login = (props) => {
    const [form, setForm] = useState(null)
    // if our handleLogin doesn't have 200(OK) it just returns the data ...which is where our error message will come from thanks to the controller logic we set up in Express!
    const [errorMsg, setErrorMsg] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        let submission = await props.handleLogin(form)
        // console.log(submission) // this only shows up IF handleLogin returns an error, otherwise it'll be undefined
        if(submission) {
            setErrorMsg(submission.error)
        }
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    return (
        <div className="form-container">
            <h1>Welcome Back!</h1>
            <form onSubmit={handleSubmit}>
                <span>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" onChange={handleChange}/>
                </span>
                <span>                
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" onChange={handleChange}/>
                    </span>
                <span>                
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" onChange={handleChange}/>
                </span>
                <input type="submit" value="Login"/>
            </form>
            {/* inside the form display the error message in red */}
            {errorMsg ? <h4 style={{color: "red"}}>{errorMsg}</h4> : ""}
        </div>
    )
}

export default Login