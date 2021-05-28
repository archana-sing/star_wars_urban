import React from 'react'





const SuggestionBox = ({suggestions}) => {
    const [active , setActive] = React.useState(0)
    const scrollRef = React.useRef();
    
    const handleChangeActiveSuggestion = (e) =>{
        console.log(e.keyCode , active)
        scrollRef.current.scrollTop += 30;
      
        switch(e.keyCode){
          case 40 :{
           if(active >= suggestions.length){
             setActive(0)
           }
           else{
             setActive(prev => prev + 1)
           }
          
          
           break;
          }
          case 38 :{
            if(active === 1){
              setActive(1)
            }
            else if(active <= 0){
              setActive(suggestions.length)
            }
            else{
             setActive(prev => prev -1)
            }
            
            break;
          }
          default :{
            return
          }
        }
      }
    return (
        <>
            <Suggestions ref={scrollRef} len={suggestions.length} active={active} onKeyUp = {handleChangeActiveSuggestion}>
                {suggestions.map((e, i) => (
                    <div key={e.url} onMouseOver={() => setActive(i + 1)}>
                        <p>{e.name}</p>
                    </div>
                ))}
            </Suggestions>
        </>
    )
}

export default SuggestionBox
