import React from 'react'
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom"


  //helps us prevent the user from spamming the button
  //hook that helps us move to a different page

export default function AllQuestHeader() {
  
  const history = useHistory()
  
  function handleNewQuest(e) {
    e.preventDefault()
      history.push("/new-quest")
  }
  return (
      <div  id="navBar" variant="dark" className="navbar bg-dark" >
        <h1 variant="dark" className="navbar bg-dark " style={{ color:"white", align:"center" }}>Mode Missile-less</h1>
        <Button onClick={handleNewQuest}>
          New Quest
        </Button>
      </div>
  );
}
