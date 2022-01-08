import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Show from "../../components/Show/index";
import ClickAbleCell from "../../components/ClickCells/index";
import { MIN, MAX, ROW, COL } from "../../utils/constant";
import { randomInteger, getMatrix } from "../../utils/globalFunctions";
import {
  getIndex,
  checkIfActive,
  getRandomArray,
  getArraySum
} from "./Home.helper";

export default function Home() {
  const [achievedSum, setAchievedSum] = useState(randomInteger(MIN, MAX));
  const [currentSum, setCurrentSum] = useState(0);
  const [matrix, setMatrix] = useState(getMatrix(ROW, COL, 0));
  const [selectCell, setSelectCell] = useState([]);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const callBack = e => {
    const indexObj = getIndex(e);

    //First case
    if (achievedSum == currentSum + e.target.value) {
      setSelectCell([...selectCell, indexObj]);
      makeMatrixValueZero([...selectCell, indexObj]);
      setScore(prev => prev + 1);
      setAchievedSum(randomInteger(MIN, MAX));
      insertRandowArrayToMatrix(COL);
      setSelectCell([]);
      return;
    }

    if (selectCell.length == 0) {
      setSelectCell([...selectCell, indexObj]);
      setCurrentSum(prev => prev + parseInt(e.target.value));
    } else {
      for (let i = 0; i < selectCell.length; i++) {
        if (JSON.stringify(selectCell[i]) == JSON.stringify(indexObj)) {
          setCurrentSum(currentSum - parseInt(e.target.value));
          const temp = [...selectCell];
          temp.splice(i, 1);
          setSelectCell(temp);
          return;
        }
      }
      setSelectCell([...selectCell, indexObj]);
      setCurrentSum(prev => prev + parseInt(e.target.value));
    }
  };

  const makeMatrixValueZero = arr => {
    const temp = [...matrix];
    for (let i = 0; i < arr.length; i++) {
      console.log(temp[arr[i].i][arr[i].j]);
      temp[arr[i].i][arr[i].j] = 0;
    }
    setMatrix(temp);
  };

  console.log(achievedSum, currentSum);
  console.log(matrix);

  const insertRandowArrayToMatrix = col => {
    console.log(col);
    const randomNumberArray = getRandomArray(col);
    console.log(getArraySum(randomNumberArray));
    const temp = [...matrix];
    temp.splice(col - 1, 1);
    temp.unshift([...randomNumberArray]);
    setMatrix(temp);
  };

  useEffect(() => {
    insertRandowArrayToMatrix(COL);
  }, []);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setSeconds(seconds => seconds + 1);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }, []);

  return (
    <div className={styles.app_header}>
      <div className={styles.center_container}>
        <div className={styles.score_header}>
          <div className={styles.box}>
            <div className={styles.left_box}>
              <Show classString={"achieved_sum"} valueShow={achievedSum} />
            </div>
            <div className={styles.right_box}>
              <Show classString={"current_sum"} valueShow={currentSum} />
            </div>
          </div>
          <div className={styles.total_score}>SCORE: {score}</div>
        </div>
        <div className={styles.random_number_wrapper}>
          {matrix.map((items, index) => {
            return (
              <div className={styles.matrix_row} key={index}>
                {items.map((subItems, sIndex) => {
                  return (
                    <ClickAbleCell
                      cellValue={subItems}
                      key={sIndex}
                      rowValue={index}
                      colValue={sIndex}
                      isActive={checkIfActive(index, sIndex, selectCell)}
                      clicked={e => {
                        callBack(e);
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
