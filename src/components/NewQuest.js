import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { db } from "../firebase";
import { useHistory } from "react-router-dom"

export default function NewQuest() {
  const titleRef = useRef()
  const commissionerRef = useRef()
  const bodyRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)  //helps us prevent the user from spamming the button
  
  //send user back to the home screen
  const history = useHistory()

  function handleGoBack() {
    history.push('/')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try{
      setError("")
      setLoading(true)
      await db.collection("quests").doc().set({
        title:titleRef.current.value,
        commisioner:commissionerRef.current.value,
        body:bodyRef.current.value
      })
      history.push("/")
    } catch {
        setError("Failed to create quest!")
      }
    setLoading(false)
  }
  
  return (
    <>
      <Card>
        <Card.Body>
          <h2>Add a New Quest</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
              {/* grab title into titleRef*/}
              <Form.Group id="title">
                <Form.Label>Title</Form.Label>
                <Form.Control as="textarea" rows={1} ref={titleRef} required />
              </Form.Group>
              {/* grab commissioner into commissionerRef*/}
              <Form.Group id="commissioner">
                <Form.Label>Commissioner</Form.Label>
                <Form.Control as="textarea" rows={1} ref={commissionerRef} required />
              </Form.Group>
              {/* grab body into bodyRef*/}
              <Form.Group id="body">
                <Form.Label>What's your quest?</Form.Label>
                <Form.Control as="textarea" rows={5} ref={bodyRef} required />
              </Form.Group>
              {/* triggers the async authentication function from Auth */}
              <Button disabled={loading} className="w-100" type="submit">
                Submit
              </Button>
              <Button className="w-100 " onClick={handleGoBack}>Back</Button>
            </Form>
        </Card.Body>
      </Card>
    </>
  )
}
