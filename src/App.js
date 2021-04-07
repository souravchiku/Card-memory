import React, { useEffect, useState } from 'react';
import './App.css'


const url = "https://pokeres.bastionbot.org/images/pokemon";


//let make a pair of each pokemons



export default function App() {

  const[start, setStart] = useState(false);
  const[counter, setCounter] = useState(0);
  const[win, setWin] = useState(false);
  const[openCard , setOpenCard] = useState([]);
  const [matched, setMatched]= useState([]);
  
  // open only that card which was matched
 
  const pokemons = [
    
    {id: 1, name: "balbasaur"},
    { id: 8, name: "wartotle" },
    { id: 9, name: "blastoise" },
    { id: 6, name: "charizard" },
    { id: 7, name: "suzoto" },
    { id: 10, name: "panta" },
  ]
  const pairOfPokemons = [...pokemons,...pokemons];
  
  const handleFlip =(index)=>{
    setOpenCard((openCard) => [...openCard,index])
    console.log(matched)
    // console.log(openCard)
    if(matched.length ===5){
      setStart(false)
      setWin(true)
    }
  }
  useEffect(()=>{
    
    if(openCard <2) return
    const fisrtmatch = pairOfPokemons[openCard[0]]
    const secondmatch = pairOfPokemons[openCard[1]]

    if(secondmatch && fisrtmatch.id === secondmatch.id){
      setMatched([...matched,fisrtmatch.id])
    }
    if(openCard.length ===2) setTimeout(() => 
      setOpenCard([]),1000)
   
    // console.log(fisrtmatch)
    // console.log(secondmatch)
  },[openCard])


  function Seconds(){
    setCounter(prevCounter=>{
      return prevCounter+1
    })

  }
  // to mount and unmount counter
  useEffect(()=>{
    let interval;
    if(start){
      interval=setInterval(() => {
        Seconds()
      }, 1000);
    }
    return()=>{
      clearInterval(interval)
    }
  },[start])

  function restart(){
    setWin(false)
    setStart(true)
    setMatched([])
    setCounter(0)
    setOpenCard([])
  }
  function display(){
    if(start){
      return(<>
        <div className="counter">{counter} sec</div>
            <div className="app">
            <div className="cards">
              {pairOfPokemons.map((pokemon, index) => {
                // let's flip the card with css

                let flipCard;
                flipCard = false;
                // if open card has index of currrent card then  open the card
                if(openCard.includes(index)) flipCard=true;

                if(matched.includes(pokemon.id)) flipCard= true;

                return (
                  <div className = {`pokemon-card ${flipCard? "flipped": ""}`}
                   key={index}
                   id={`${flipCard ? "disableClick" : ""}`}
                   onClick={()=>handleFlip(index)}
                   >
                    <div className="inner">
                      <div className="front">
                        <img src={`${url}/${pokemon.id}.png`}
                         alt="pokemon"
                         width="100"
                         />
                         </div>
                        <div className="back"> </div>
                         </div>
                     
                    </div>
                )
              })}
            </div>
           </div>
        </>
        
      )
    }
    else if(win){
      return(<>
        <div className="win">Congratulation !! U  have won the game in {counter} seconds</div>
        <button className="btn" onClick={restart}> Restart</button>
        </>
      )
    }else{
      // start button
      return(<div className="start">
        <button className="btn" onClick={()=>setStart(true)}>Start</button>
      </div>)
    }
  }
  return  (<div className="main">
      {display()}
  </div>)

}