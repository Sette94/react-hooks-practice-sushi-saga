import React, { cloneElement, useEffect, useState } from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";

function App() {

  const [sushi, setSushi] = useState([])
  const [filteredSushi, setFilteredSushi] = useState([])
  const [sushiArrayStart, setsushiArrayStart] = useState(0)
  const [sushiArrayEnd, setsushiArrayEnd] = useState(4)
  const [wallet, setWallet] = useState(40)
  const [plates, setPlates] = useState([])


  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setFilteredSushi(data.slice(sushiArrayStart, sushiArrayEnd)) //Set filteredSushi to be the first four pieces
        setSushi(data)
      })

  }, [])


  //Sushi is an array of object, we wantt to only pass down the first 4 to the SushiContainer 
  // const firstFour = sushi.slice(0, 4)
  // setFilteredSushi(firstFour)

  //handlers 
  function addSushiHandler() {
    const newSushiArrayStart = sushiArrayStart + 4;
    const newSushiArrayEnd = sushiArrayEnd + 4;
    const slicedSushi = sushi.slice(newSushiArrayStart, newSushiArrayEnd);
    setFilteredSushi(slicedSushi);
    setsushiArrayStart(newSushiArrayStart);
    setsushiArrayEnd(newSushiArrayEnd);
  }

  //Wallet will need to go down to Table but come from Sushi



  function walletHandler(piece) {
    if (wallet >= piece.price) {
      piece.eaten = true
      setWallet((prev) => prev - Number(piece.price))

      const updatedSushi = filteredSushi.map(item => {
        if (item.id === piece.id) {
          return piece;
        }
        return item;
      });
      setPlates((prev) => [...prev, [piece]]);
      setFilteredSushi(updatedSushi)
    }
    else {
      alert("Please refill your wallet")
    }
  }



  return (
    <div className="app">
      {wallet > 0 && sushi && <SushiContainer sushi={filteredSushi} addSushiHandler={addSushiHandler} walletHandler={walletHandler} />}
      <Table wallet={wallet} plates={plates} />
    </div>
  );
}

export default App;
