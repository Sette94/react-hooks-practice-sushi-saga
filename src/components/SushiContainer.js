import React from "react";
import MoreButton from "./MoreButton";
import Sushi from "./Sushi";

function SushiContainer({ sushi, addSushiHandler, walletHandler }) {

  //pass down an eaten boolean to to Sushi so that we can properly render the empty plate 

  return (
    <div className="belt">
      {
        sushi.map((piece, index) => {
          return <Sushi key={index} {...piece} walletHandler={walletHandler} />
        })
      }
      <MoreButton addSushiHandler={addSushiHandler} />
    </div>
  );
}

export default SushiContainer;
