import { createContext, useState } from "react";
import run from '../config/gemini'

export const Context = createContext()

const ContextProvider = (props) => {
   const [input, setInput] = useState("")
   const [recentPrompt, setRecentPrompt] = useState("")
   const [prevPrompt, setPrevPrompt] = useState([])
   const [showResult, setShowResult] = useState(false)
   const [loading, setLoading] = useState(false)
   const [resultData, setResultData] = useState("")

   // Função para adicionar quebras de linha antes de números seguidos por um ponto
   const addLineBreaks = (text) => {
     return text.replace(/(\d+\.)/g, '<br /><br />$1');
   };

   const delayPara = (index,nextWord) => {
    setTimeout(function(){
              setResultData(i=>i+nextWord)
    }, 75 * index)
   }

   const onSent = async (prompt) => {
       setResultData("")
       setLoading(true)
       setShowResult(true)
       setRecentPrompt(input)
       setPrevPrompt(prev=>[...prev,input])
       const response = await run(input)

       // Adiciona quebras de linha antes de números seguidos por ponto
       let formattedResponse = addLineBreaks(response);

       let responseArray = formattedResponse.split("**")
       let newResponse = ""
       for(let i = 0; i < responseArray.length; i++){
        if(i === 0 || i%2 !== 1){
            newResponse += responseArray[i]
        }
        else {
            newResponse += "<b>"+responseArray[i]+"</b>"
        }
       }

       let newResponse2 = newResponse.split("*").join("</br>")
       let newResponseArray = newResponse2.split(" ")

       for(let i=0;i<newResponseArray.length;i++)
       {
        const nextWord = newResponseArray[i]
        delayPara(i,nextWord+" ")
       }
       
       setLoading(false)
       setInput("")
   }
   
   const contextValue = {
       input,
       setInput,
       recentPrompt,
       setRecentPrompt,
       prevPrompt,
       setPrevPrompt,
       showResult,
       setShowResult,
       loading,
       setLoading,
       resultData,
       setResultData,
       onSent
   }

   return (
       <Context.Provider value={contextValue}>
           {props.children}
       </Context.Provider>
   )
}

export default ContextProvider
