import React, { useEffect, useState } from 'react';
import { useAuth } from "../contexts/AuthContext"
import {  Container, Spinner, Card, Button, Navbar } from "react-bootstrap";
import { db } from '../firebase.js';
import AllQuestHeader from './AllQuestHeader.js'
import UserPanel from './UserPanel.js'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function HomeSplash() {
  //const [track, setTrack] = useState("Track")
  const [loading, setLoading] = useState(false)
  const [questCards, setQuestCards] = useState([])
  const [trackedQuestCards, setTrackedQuestCards] = useState([])
  const [currentTrackedCard, setcurrentTrackedCard] = useState()
  const { currentUser } = useAuth()
  
  const questRef = db.collection("quests");
  const trackedQuestRef = db.collection("users");
  // const snapshot = await questRef.get();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
  }}

  //this fetches particularly for user tracked fetch cards.
  // function handleTrackedQuests() {
  //   db.collection('users').get().then((snapshot) => { 
  //     snapshot.docs.forEach(doc => {
  //       setTrackedQuestCards(doc.data().trackedQuests)
  //     })
  //   })
  // }
  function handleTrackedQuests() {
    setLoading(true)
    trackedQuestRef.onSnapshot((querySnapshot) => {
      const tracked = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data().trackedQuests)
        tracked.push(doc.data().trackedQuests)
        console.log(trackedQuestCards);
      });
      setTrackedQuestCards(tracked);
      setLoading(false);
    });
  }

  function pushTrackedQuests() {

  }

  function removeTrackedQuests() {
    
  }
  

  //this upodates our general pool of task cards in real time
  function handleGetGenQuests() {
    setLoading(true)
    questRef.onSnapshot((querySnapshot) => {
      const quests = [];
      querySnapshot.forEach((doc) => {
        quests.push(doc.data());
      });
      setQuestCards(quests);
      setLoading(false);
    });
  }
 
  useEffect(() => {
    handleGetGenQuests()
    handleTrackedQuests()
    console.log(questCards)
    console.log(trackedQuestCards)
  },[])

  if(loading) {
    return <Spinner animation="grow">Loading...</Spinner>
  }
  return (
    <>
      <Container>
        <UserPanel/>
      </Container>
      <Container>
        
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
          </Container>
        </Navbar>
            <AllQuestHeader/>
        <Card>
          <Carousel   
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={1000}
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {questCards.map((quest) => ( 
              <Card> 
                <Card.Header>
                    <h3><b>{quest.title}</b></h3>
                  <Card.Body>
                    <h4>By: {quest.commisioner}</h4>
                    <p>{quest.body}</p>
                    <Button onClick={handleTrackedQuests}>Track</Button>
                  </Card.Body>
                </Card.Header>
              </Card> 
            ))}
          </Carousel>
          <>
          <h1 variant="dark" className="navbar bg-dark " style={{ color:"white", align:"center" }}>My Quest Log</h1>
            {trackedQuestCards.map((trackedQuest) => (
              
              <Card> 
                <Card.Header>
                    <h3><b>{trackedQuest.title}</b></h3>
                  <Card.Body>
                    <h4>By: {trackedQuest.commisioner}</h4>
                    <p>{trackedQuest.body}</p>
                    <Button>Untrack</Button>
                  </Card.Body>
                </Card.Header>
              </Card> 
            ))}
          </>
        </Card>         
      </Container>
    </>
  )
}
