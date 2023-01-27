import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import Board from './component/Board';

const App = () => {

    const [boxArr , setBoxArr] = useState([])

    const [source , setSource] = useState([-1 , -1])

    const [target , setTarget] = useState([-1 , -1])

    const [gameOver , setGameOver] = useState(true)

    const [currQueue , setCurrQueue] = useState([])


    const boardButtonClickHandler = (row , col) => {
        if(source[0] === -1){
            boxArr[row][col] = "source"
            setBoxArr(boxArr)
            setSource([row , col])
        }
        else if(target[0] === -1){
            boxArr[row][col] = "target"
            setBoxArr(boxArr)
            setTarget([row , col])
        }

        else {
            changeBoard([-1 , -1])
        }
    }

    const changeBoard = () => {
        if(currQueue.length){
            let [cR , cC] = [...currQueue[0]]
            boxArr[cR][cC] = "fill"
            setBoxArr([...boxArr])

            if(target[0]===cR && target[1]===cC){
                setGameOver(true)
                return
            }
            const x = [0 , -1 , 0 , 1];
            const y = [1 , 0 , -1 , 0];
            let t = [];
            for(let i=0;i<4;i++){
                const nR = cR+x[i];
                const nC = cC+y[i];
                if(nR > -1 && nC > -1 && nR < 30 && nC < 13 && boxArr[nR] [nC] !== 'fill'){
                    t = [...t , [nR , nC]];
                }
            }
            setCurrQueue(prev => [...prev.filter((item , ind) => ind!==0) , ...t])
        }
        else setGameOver(true)
    }

    
    useEffect(()=>{
        setBoxArr(Array(13).fill(0).map(item => item = Array(30).fill('simple')))
    },[])

    useEffect(()=>{
        setCurrQueue([source])
    },[source])

    // useEffect(()=>{
    //     if(!gameOver){
    //         setTimeout(()=>{
    //             changeBoard(-1 , -1)
    //         },1)
    //     }
    // },[gameOver , boxArr])

    useEffect(()=>{
        if(currQueue.length && !gameOver){
            changeBoard([-1 , -1])
        }
    },[currQueue])



    return (
        <>
          <Board board = {boxArr} onClick={boardButtonClickHandler} />
        </>
      )
}

export default App