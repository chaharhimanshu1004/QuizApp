import React from 'react'
import '../styles/QuizPage.css'
import { useState } from 'react'
import { data } from '../data/data';
import { useRef } from 'react';


function QuizPage() {
    const [index,setIndex] = useState(0);
    const [ques,setQues] = useState(data[index]);
    const [lock,setLock] = useState(false);
    const [total,setTotal] = useState(0);
    const [result,setResult] = useState(false);

    let Option1 = useRef(null)
    let Option2 = useRef(null)
    let Option3 = useRef(null)
    let Option4 = useRef(null)

    let optionArray = [Option1,Option2,Option3,Option4];

    const checkAns=(e,ans)=>{
        if(!lock){
            if(ques.ans === ans){
                e.target.classList.add('correct');
                setLock(true);
                let newTotal = total+1;
                setTotal(newTotal);
            }else{
                e.target.classList.add('wrong');
                setLock(true);
                optionArray[ques.ans-1].current.classList.add('correct');
                let newTotal = total-1;

                setTotal(newTotal);
            }
        }

    }
    function reset(e){ 
        e.preventDefault();
        setIndex(0)
        setQues(data[0])
        setTotal(0)
        setLock(false)
        setResult(false)
        
    }
    function handleClick(e){
        e.preventDefault();
        if(lock){
            if(index == 4){
                setResult(true);
                return 0;
            }
            let newIndex = index+1;
            setIndex(newIndex)
            setQues(data[newIndex])
            setLock(false)
            optionArray.map((option)=>{
                option.current.classList.remove("wrong")
                option.current.classList.remove("correct")
                return null;
            })
        }

    }
  return (
    <div className='box'>
        <h1>Quiz App</h1>
        <hr className="line" />
        <hr />
        {
            result?<>

            <h2 className='result'>You scored {total} out of 5</h2>
            <button onClick={reset}>Reset</button>
            </>:
            <>
        <h2 className='heading'>
            {index+1}. {ques.question}
        </h2>
        <ul className='list'>
           <li ref={Option1} onClick={(e)=>checkAns(e,1)}>{ques.option1}</li>
           <li ref={Option2} onClick={(e)=>checkAns(e,2)}>{ques.option2}</li>
           <li ref={Option3} onClick={(e)=>checkAns(e,3)}>{ques.option3}</li>
           <li ref={Option4} onClick={(e)=>checkAns(e,4)}>{ques.option4}</li>
        </ul>
        <button onClick={handleClick}>Next</button>
        <div className="index">{index+1} out of 5 questions</div>

        </>
        }
        
        
    </div>
  )
}

export default QuizPage