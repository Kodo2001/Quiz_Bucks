import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

export default function Trivia({ data, setStop, questionNumber, setQuestionNumber }) {

  const [question, setQuestion]=useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(()=>{
    setQuestion(data[questionNumber-1])//lera setQuestion yake la objectekan danere bo variable question away useStateakay sare awja boya naqs 1 m krd chunka questionNumber xoy 1 m dawate -1 dabtawa sfr u yakam element(objecte) arrayeka dagretawa.
  },[data, questionNumber]) //wata dependecyaka ya psht bastnaka bagweray data u question number dabe harkam lam dwana bgoret awa aw useEffecta render dabetawa.

  const delay=(duration , callback)=>{
    setTimeout(() => {
      callback();
    }, duration);
  }

  const handleClick=(a)=>{ //ema 4 halbzhardaman haya kate click la har walamek dakam aw functiona run dabet u walamakash wak parameter wardagret
    setSelectedAnswer(a);
    setClassName("answer active"); // ta era walamaky clickm lrkrda active dabe u backgrounde dabta shen
    delay(3000,()=> // aw functiona dale dway 3 chrka la click krdn la walamaka agar a.correct aka true bu awa walamaka classname akay bka "answer correct " awja aw style wardagre ka la css daman nawa bo aw classNamea
    setClassName(a.correct ? "answer correct" : "answer wrong")
 );
 delay(5000,()=>{ //lanaw aw functiona gutuma lamaway 6 chrka la dyarekrdne walamaka agar a.correct true bu awa useState questionNumber danak zya bka amash wadaka bchta prsyare dwatr ay agar walamakam halabu ya a.correct false bu ? awa useState setStop bka true ka bbta trush wata yareakat dorandwa
  if(a.correct){
    correctAnswer();
    delay(1000,()=>{
      setQuestionNumber(prev=>prev+1)
    setSelectedAnswer(null)
    })
    
  }else{
    wrongAnswer();
    delay(1000,()=>{
      setStop(true);
    })
  }

 } //End of annonymous function in handle function....
); //End of delay function
  };//END of handle function
  return (
    <div className="trivia">

      <div className="question">{question?.question}</div> 

      <div className="answers">
        { question?.answers.map((a)=>(
        <div className={selectedAnswer===a?className :"answer"} onClick={()=>handleClick(a)}>
          {a.text}
          </div>
        )) }
       
      </div>

    </div>
  )
}
