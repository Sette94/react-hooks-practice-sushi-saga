import React from "react";

function Sushi({ walletHandler, ...piece }) {
  const { id, name, img_url, price, created_at } = piece;

  return (
    <div className="sushi">
      <div className="plate" onClick={() => walletHandler(piece)}>
        {/* Tell me if this sushi has been eaten! */}
        {piece.eaten ? null : (
          <img
            src={img_url}
            alt={name + " Sushi"}
            width="100%"
          />
        )}
      </div>
      <h4 className="sushi-details">
        {name} - ${price}
      </h4>
    </div>
  );
}

export default Sushi;
