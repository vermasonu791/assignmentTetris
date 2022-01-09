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
  getArraySum,
  makeMatrixValueZero,
  moveArrayElement
} from "./Home.helper";
import Timer from "../../components/Timer/index";

export default function Home() {
  const [achievedSum, setAchievedSum] = useState(randomInteger(MIN, MAX));
  const [showCurrentSum, setCurrentSum] = useState(0);
  const [matrix, setMatrix] = useState(getMatrix(ROW, COL, 0));
  const [selectedCellIndexArr, setSelectCell] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setGameOver] = useState(false);
  const [insertCount, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  let interval;

  /*play again*/
  const refreshPage = () => {
    window.location.reload();
  };

  /* Insert random number row to matrix on first render */
  useEffect(() => {
    insertRandowArrayToMatrix(COL);
  }, []);

  /* This function will run when you will click any cell */
  const handleCellClick = e => {
    const indexObj = getIndex(e);
    /* case 1 when we found sum on click single cell */
    if (achievedSum == parseInt(e.target.value)) {
      updateMatrix([indexObj]);
      insertRandowArrayToMatrix(COL);
      setScore(prev => prev + 1);
      return;
    }

    /* check if user clicking on same cell again */
    if (selectedCellIndexArr.length == 0) {
      setSelectCell([...selectedCellIndexArr, indexObj]);
      setCurrentSum(prev => prev + parseInt(e.target.value));
    } else {
      /* loop through the selected index array  */
      for (let i = 0; i < selectedCellIndexArr.length; i++) {
        if (
          JSON.stringify(selectedCellIndexArr[i]) == JSON.stringify(indexObj)
        ) {
          setCurrentSum(showCurrentSum - parseInt(e.target.value));
          /* remove the index from selected array */
          const temp = [...selectedCellIndexArr];
          temp.splice(i, 1);
          setSelectCell(temp);
          return;
        }
      }
      /* push selected cell index to selected array*/
      setSelectCell([...selectedCellIndexArr, indexObj]);
      setCurrentSum(prev => prev + parseInt(e.target.value));
    }
  };

  useEffect(() => {
    /* case 2 If the currentsum is equal to achieved the sum */
    if (achievedSum == showCurrentSum) {
      setScore(prev => prev + 1);
      updateMatrix(selectedCellIndexArr);
      const lastArraySum = getArraySum(matrix[ROW - 1]);
      if (lastArraySum != 0) {
        setGameOver(true);
        setSelectCell([]);
      } else {
        insertRandowArrayToMatrix(COL);
      }
      setSeconds(0);
      return;
    }
    /* case 3 If the currentsum is greater then achieved the sum */
    if (showCurrentSum > achievedSum) {
      updateMatrix(selectedCellIndexArr);
      return;
    }
  }, [showCurrentSum]);

  /* This function will run if any case true to update matrix */
  const updateMatrix = selectedCellArray => {
    /* this function is used to empty the cell/disappear */
    const getUpdatedMatrix = makeMatrixValueZero(selectedCellArray, [
      ...matrix
    ]);
    setSelectCell([]);
    setMatrix(getUpdatedMatrix);
    setAchievedSum(randomInteger(MIN, MAX));
    setCurrentSum(0);
  };

  /* this function will call when to add new random number row to matrix */
  const insertRandowArrayToMatrix = col => {
    const randomNumberArray = getRandomArray(col);
    const temp = [...matrix];
    temp.splice(col - 1, 1);
    temp.unshift([...randomNumberArray]);
    setMatrix(temp);
    setCount(prev => prev + 1);
  };

  /* This useEffect to handle the case 4 */
  useEffect(() => {
    if (insertCount > ROW) {
      setCount(prev => prev - 1);
      checkIfMiddleMatrixArrEmpty(insertCount - 1);
    } else {
      checkIfMiddleMatrixArrEmpty(insertCount);
    }
  }, [insertCount]);

  /* Case 4 :- if complete middle row disappear */
  const checkIfMiddleMatrixArrEmpty = count => {
    if (count > 1) {
      let temp = [...matrix];
      let updateMatrix;
      let check = false;
      for (let i = 0; i < count; i++) {
        if (getArraySum(temp[i]) == 0) {
          updateMatrix = moveArrayElement(temp, i, ROW - 1);
          check = true;
        }
      }
      if (check) setMatrix(updateMatrix);
    }
  };

  /* run setInerval in every 1 second */
  useEffect(() => {
    interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
  }, []);

  //clear interval after game over
  useEffect(() => {
    return () => clearInterval(interval);
  }, [isGameOver]);

  /* If one of the columns is filled completely and the timer runs out */
  useEffect(() => {
    if (seconds == 10) {
      /* if arr sum = 0 then the complete cell is empty*/
      const lastArraySum = getArraySum(matrix[ROW - 1]);
      if (lastArraySum != 0) {
        /* it is game over! (Because there is no room for a full new row to appear)*/
        setGameOver(true);
        setSelectCell([]);
      } else {
        setSeconds(0);
        insertRandowArrayToMatrix(COL);
        setSelectCell([]);
        setCurrentSum(0);
        setAchievedSum(randomInteger(MIN, MAX));
      }
    }
  }, [seconds]);

  return (
    <div className={styles.app_header}>
      <div className={styles.center_container}>
        <div className={styles.score_header}>
          {isGameOver ? (
            <div className={styles.total_score}>
              <p>Game Over</p>
              <p>Final Score: {score}</p>
              <div className={styles.time_finish}>
                <div className={styles.time_bar}></div>
              </div>
              <button onClick={refreshPage}>Play Again</button>
            </div>
          ) : (
            <div className={styles.box}>
              <div className={styles.flex_item}>
                <div className={styles.left_box}>
                  <Show classString={"achieved_sum"} valueShow={achievedSum} />
                </div>
                <div className={styles.right_box}>
                  <Show
                    classString={"current_sum"}
                    valueShow={showCurrentSum}
                  />
                </div>
              </div>
              <div className={styles.total_score}>SCORE: {score}</div>
              <div className={styles.timer}>
                <Timer seconds={seconds} />
              </div>
            </div>
          )}
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
                      disable={isGameOver}
                      isActive={checkIfActive(
                        index,
                        sIndex,
                        selectedCellIndexArr
                      )}
                      clicked={e => {
                        handleCellClick(e);
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
