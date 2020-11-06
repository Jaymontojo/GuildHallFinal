import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { db } from "../firebase";


export default function Signup() {
  const displayNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  //helps us prevent the user from spamming the button
  const [loading, setLoading] = useState(false)
  //hook that helps us move to a different page
  const history = useHistory()

  async function handleSubmit(e) {
    //
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      await db.collection("quests").doc().set({
        displayName:displayNameRef.current.value, 
        emailName:emailRef.current.value,
        password:passwordRef.current.value
      })
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Welcome!</h2>
          {error && <Alert variant="danger">{error}</Alert>}  
          
          <Form onSubmit={handleSubmit}>
            {/* grab display name into displayNameRef*/}
            <Form.Group id="display-name">
              <Form.Label>Display Name</Form.Label>
              <Form.Control ref={displayNameRef} required/>
              <Form.Text className="text-muted">
                Other Adventurers will see this!
              </Form.Text>
            </Form.Group>

            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
              <Form.Text className="text-muted">
                We'll never share your email address, trust us!
              </Form.Text>
            </Form.Group>
            
            {/* grab password into passwordRef**/}
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />              <Form.Text className="text-muted">
                Uppercase and lowercase (include special characters and numbers!)
              </Form.Text>
            </Form.Group>
            
            {/* grab password into passwordConfirmRef**/}
            <Form.Group id="password-confirm">
              <Form.Label>Re-type Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            
            {/* triggers the async authentication function from Auth */}
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>    
        
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        {/* Link helps us switch from log in to signup */}
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}