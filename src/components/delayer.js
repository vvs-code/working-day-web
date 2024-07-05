import { useEffect, useState } from "react";

function Delayer() {
    const [isFetching, setIsFetching] = useState(true); 

    useEffect(() => {
      setTimeout(function () {
        //console.log("Delayed for 1 second."); 
        setIsFetching(false); 
      }, 1000);
    }, []);
  
    if (isFetching) {
      return (
        <h1>Загрузка...</h1>
      );
    }

    return;
}

export default Delayer;