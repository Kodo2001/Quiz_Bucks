import { useState,useEffect, useMemo } from 'react'
import './App.css'
import Trivia from './components/Trivia';
import Timer from './components/Timer';
import Start from './components/Start';

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber,setQuestionNumber]=useState(1);
  const [stop, setStop] = useState(false); //agar time out bbta true wadakaen yareaka bdorenet chon dabta true agar walamake hala halbzhere wa agar katt tawawbet u hecht halnabzhardbet.
  const [earned, setEarned] = useState("$ 0");

  const data = [ // awa dabu componentake jyam bo krdbawa bas projectakam bchuka boya lera damnawa awa Arrayeka banawe data ka 3 objecte tedaya har objecta u 3 key u value tedaya 1-id wa 2-question wa 3-answers ka answerakash arrayeka u 4 objecte tedaya har objectakesh 2 key u 2 value tedaya
    {
      id: 1,
      question: "kodo's age'?",
      answers: [ //awash arrayeka ka 4 objecte tedaya har objektakesh 2 key u value tedaya
        {
          text: "19",
          correct: false,
        },
        {
          text: "23",
          correct: true,
        },
        {
          text: "36",
          correct: false,
        },
        {
          text: "24",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "23 years old it means kodo is.......?",
      answers: [ //awash arrayeka ka 4 objecte tedaya har objektakesh 2 key u value tedaya
        {
          text: "2001",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "kodo la ch sharek daxwenet?",
      answers: [ //awash arrayeka ka 4 objecte tedaya har objektakesh 2 key u value tedaya
        {
          text: "koya",
          correct: false,
        },
        {
          text: "slemani",
          correct: false,
        },
        {
          text: "qwlqwla",
          correct: false,
        },
        {
          text: "Hawler",
          correct: true,
        },
      ],
    },

    {
      id: 4,
      question: "wshay Bashnn he kam kasaya?",
      answers: [ //awash arrayeka ka 4 objecte tedaya har objektakesh 2 key u value tedaya
        {
          text: "Karwan",
          correct: false,
        },
        {
          text: "Pur fatm",
          correct: true,
        },
        {
          text: "Nzar",
          correct: false,
        },
        {
          text: "Ruaya",
          correct: false,
        },
      ],
    }

  ];

  const moneyPyramid= useMemo(()=>  //15 prsyarm haya boya 15 object 
    [        
      { id: 1, amount: "$ 100" },
      { id: 2, amount: "$ 200" },
      { id: 3, amount: "$ 300" },
      { id: 4, amount: "$ 500" },
      { id: 5, amount: "$ 1.000" },
      { id: 6, amount: "$ 2.000" },
      { id: 7, amount: "$ 4.000" },
      { id: 8, amount: "$ 8.000" },
      { id: 9, amount: "$ 16.000" },
      { id: 10, amount: "$ 32.000" },
      { id: 11, amount: "$ 64.000" },
      { id: 12, amount: "$ 125.000" },
      { id: 13, amount: "$ 250.000" },
      { id: 14, amount: "$ 500.000" },
      { id: 15, amount: "$ 1.000.000" },
    ].reverse(),
  []);

  useEffect(()=>{ //awa bakardenm bo goreny prsyaraka u gorene nrxakan(earned) aka
    questionNumber>1 &&
    setEarned(moneyPyramid.find((m)=> m.id === questionNumber - 1).amount);
      },[moneyPyramid,questionNumber]);
     

  return (
    <>
    <div className="app">
      { username ? (
        <> 

<div className="main">
        { stop ? <h1 className='endText' >you earned : {earned}</h1> : (
         <>
            <div className="top">
          <div className="timer"> <Timer setStop={setStop} questionNumber={questionNumber} /> </div>
        </div>
        <div className="bottom">
          <Trivia 
          data={data}
           setStop={setStop}
           questionNumber={questionNumber}
           setQuestionNumber={setQuestionNumber}
           />
        </div>
         </>
        )
        
        }
     
      </div>

      <div className="pyramid">

        <ul className="moneyList">
          {moneyPyramid.map((m)=>(
            <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem" }>
            <span className='moneyListItemNumber' >{m.id}</span>
            <span className="moneyListItemAmount">{m.amount}</span>
          </li>
          ))}
          
        </ul>

      </div>

        </>

      ) : <Start setUsername={setUsername} /> }

     

    </div>
    </>
  )
}

export default App
