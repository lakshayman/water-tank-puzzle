import { useState } from "react";

export const Tank = ({
  noOfTanks,
  quantity,
  index,
  setQuantityInTanks,
  quantityInMagicTank,
  setQuantityInMagicTanks,
}) => {
  const [timer, setTimer] = useState(null);
  const [buttonName, setButtonName] = useState("Add Water");

  return (
    <div className="tank-box">
      <div
        className="tank"
        style={{
          background: `linear-gradient(to bottom, transparent 0%,transparent ${
            100 - (quantity / 10 + quantityInMagicTank / 10)
          }%, #9EE3B4 ${
            100 - (quantity / 10 + quantityInMagicTank / 10)
          }%,#9EE3B4 ${100 - quantity / 10}%,#84cdee ${
            100 - quantity / 10
          }%,#84cdee 100%)`,
        }}
      ></div>
      <button
        onClick={() => {
          setQuantityInMagicTanks((prev) => {
            const newQuantityInTanks = [...prev];
            newQuantityInTanks[index] = 0;
            return newQuantityInTanks;
          });
          setQuantityInTanks((prev) => {
            const newQuantityInTanks = [...prev];
            newQuantityInTanks[index] = 0;
            return newQuantityInTanks;
          });
        }}
      >
        Empty Tank
      </button>
      <div style={{position: 'relative', marginTop: '40px'}}>
      <button
        className="box"
        onMouseDown={() => {
          setButtonName("Filling Water");
          const timer = setInterval(() => {
            setQuantityInMagicTanks((prev) => {
              const newQuantityInMagicTanks = [...prev];
              newQuantityInMagicTanks[index] =
                1000 - (newQuantityInMagicTanks[index] + quantity) > 200
                  ? newQuantityInMagicTanks[index] + 200
                  : newQuantityInMagicTanks[index] +
                    (1000 - (newQuantityInMagicTanks[index] + quantity));
              return newQuantityInMagicTanks;
            });
          }, 1000);
          setTimer(timer);
        }}
        onMouseUp={() => {
          setButtonName("Add Water");
          clearInterval(timer);
        }}
      >
        <span>{buttonName}</span>
        <i></i>
      </button>
      </div>
    </div>
  );
};
