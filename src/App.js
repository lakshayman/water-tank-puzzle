import { useEffect, useState } from "react";
import "./App.css";
import { Tank } from "./Components/Tank";

function App() {
  const [noOfTanks, setNoOfTanks] = useState(0);
  const [quantityInTanks, setQuantityInTanks] = useState(
    Array(noOfTanks).fill(0)
  );
  const [quantityInMagicTanks, setQuantityInMagicTanks] = useState(
    Array(noOfTanks).fill(0)
  );

  useEffect(() => {
    setQuantityInTanks(prev => [...prev, 0]);
    setQuantityInMagicTanks(prev => [...prev, 0]);
  }, [noOfTanks]);

  useEffect(() => {
    const ifArrayIsWithEqualValues = (arr, value) => {
      console.log(arr);
      for(let i = 0; i < arr.length; i++) {
        if (arr[i] !== value) {
          return false;
        }
      }
      return true;
    };
    let timer1 = setInterval(() => {
      console.log("Running");
      setQuantityInMagicTanks((prev1) => {
        console.log(!ifArrayIsWithEqualValues(prev1, 0));
        if (!ifArrayIsWithEqualValues(prev1, 0)) {
          const totalInMagicTank = prev1.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          const flow = Math.min(25, totalInMagicTank);
          const avgQty = flow / prev1.length;
          setQuantityInTanks((prev) => {
            const waterInTanks = prev.map((val) => val + Math.min(avgQty, 1000 - val));
            return waterInTanks;
          });
          return prev1.map((val) => {
            return val - ((val / totalInMagicTank) * flow);
          });
        }
        return prev1;
      });
      setQuantityInTanks((prev) => {
        const waterInTanks = [...prev];
        if(!ifArrayIsWithEqualValues(waterInTanks, waterInTanks[0])) {
          const totalWaterInTanks = waterInTanks.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          const avgQtyInTank = totalWaterInTanks/waterInTanks.length;
          let tanksWithMoreWater = 0, tanksWitLessWater = 0;
          for(let i = 0; i < waterInTanks.length; i++) {
            if(waterInTanks[i] > avgQtyInTank) {
              tanksWithMoreWater++;
            } else if(waterInTanks[i] < avgQtyInTank) {
              tanksWitLessWater++;
            }
          }
          return waterInTanks.map(water => {
            if(water > avgQtyInTank) {
              return Math.max(avgQtyInTank, water - (25/tanksWithMoreWater));
            } else if(water < avgQtyInTank) {
              return Math.min(avgQtyInTank, water + (25/tanksWitLessWater));
            } else {
              return water;
            }
          })
        }
        return waterInTanks;
      });
    }, 1000);
    return () => {
      clearInterval(timer1);
    };
  }, []);

  return (
    <div className="App">
      <h1 className="App-heading">Water Tank Puzzle</h1>
      <button
        onClick={() => {
          setNoOfTanks((prev) => prev + 1);
        }}
      >
        Add Tank
      </button>
      <div className="tank-container">
        {quantityInTanks.map((quantity, index) => {
          return (
            <Tank
              noOfTanks={noOfTanks}
              quantity={quantity}
              quantityInMagicTank={quantityInMagicTanks[index]}
              index={index}
              setQuantityInTanks={setQuantityInTanks}
              setQuantityInMagicTanks={setQuantityInMagicTanks}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
