import React, { useState, useEffect } from "react"
import Die from "./components/Die" 
import './styles.css'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'



export default function App(){

    //IMPLEMENT ADDING DOTS TO THE DIE IN CSS
    // TRACK THE NUMBER OF ROLLS
    //  TRACK THE TIME IT TOOK TO WIN
    // SAVE THE BEST TIMES TO LOCAL STORAGE

    const [tenzies, setTenzies] = useState(false)
    const [dice, setDice] = useState(allNewDice)


    useEffect(() =>{
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value;
        const allTheSame = dice.every(die => die.value === firstValue)
        if(allHeld && allTheSame){
            setTenzies(true)
            console.log("You won!")
        }

        return() => {    
        }
    }, [dice])

    function generateNewDie() {
          return  { 
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            }
        }

    function allNewDice(){
        //new array to hold random numbers
        const newDice = []
        //loop 10 times
        for(let i=0; i < 10; i++){
              // push random number from 1-6 to my array
              newDice.push(generateNewDie())
        }
        //return array
        return newDice
    }

    

    function rollDice(){
       if(!tenzies){
            setDice(oldDice =>
                // we want to iterate through the old dice 
                oldDice.map((die => (
                   die.isHeld ? die : generateNewDie()
                    ))   
                )
            )} else {
                setDice(allNewDice())
            }
        
    }

    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            // return if die's id matches with the paramter passed from the Die component's handleClick anomymous function 
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} : 
                die

    }))}



    
    
    const diceElements = dice.map((die) => (
        <Die 
            id={die.id}
            handleClick={() => holdDice(die.id)}
            key={die.id} 
            value={die.value}
            isHeld={die.isHeld}
        />
    ))



     
    return(
        <main className="flex">
                {tenzies && <Confetti />}
                <h1 className="title">TENZIES</h1>
                <p  className="instructions">
                    {tenzies ? "You won!" : "Roll until all dice are the same. Click each die to freeze it at its current value between points"}</p>
            <div className="dice-container"> 
                {diceElements}
            </div>
            <button onClick={rollDice} className="button flex">{tenzies ? "New Game!" : "ROLL"}</button>
        </main>
        )
}