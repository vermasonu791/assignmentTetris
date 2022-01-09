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
  const [selectCell, setSelectCell] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setGameOver] = useState(false);
  const [insertCount, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleCellClick = e => {
    const indexObj = getIndex(e);
    /* case 1 when we found sum on click single cell */
    if (achievedSum == parseInt(e.target.value)) {
      updateStatus([indexObj]);
      insertRandowArrayToMatrix(COL);
      setScore(prev => prev + 1);
      return;
    }
    if (selectCell.length == 0) {
      setSelectCell([...selectCell, indexObj]);
      setCurrentSum(prev => prev + parseInt(e.target.value));
    } else {
      for (let i = 0; i < selectCell.length; i++) {
        if (JSON.stringify(selectCell[i]) == JSON.stringify(indexObj)) {
          setCurrentSum(showCurrentSum - parseInt(e.target.value));
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

  useEffect(() => {
    /* case 2 If the currentsum is equal to achieved the sum */
    if (achievedSum == showCurrentSum) {
      setScore(prev => prev + 1);
      updateStatus(selectCell);
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
      updateStatus(selectCell);
      return;
    }
  }, [showCurrentSum]);

  const updateStatus = function(selectedCellArray) {
    const getUpdatedMatrix = makeMatrixValueZero(selectedCellArray, [
      ...matrix
    ]);
    setSelectCell([]);
    setMatrix(getUpdatedMatrix);
    setAchievedSum(randomInteger(MIN, MAX));
    setCurrentSum(0);
  };

  const insertRandowArrayToMatrix = col => {
    const randomNumberArray = getRandomArray(col);
    const temp = [...matrix];
    temp.splice(col - 1, 1);
    temp.unshift([...randomNumberArray]);
    setMatrix(temp);
    setCount(prev => prev + 1);
  };

  useEffect(() => {
    insertRandowArrayToMatrix(COL);
  }, []);

  useEffect(() => {
    if (insertCount > ROW) {
      setCount(prev => prev - 1);
      checkIfMiddleMatrixArrEmpty(insertCount - 1);
    } else {
      checkIfMiddleMatrixArrEmpty(insertCount);
    }
  }, [insertCount]);

  const checkIfMiddleMatrixArrEmpty = function(count) {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds == 10) {
      const lastArraySum = getArraySum(matrix[ROW - 1]);
      if (lastArraySum != 0) {
        setGameOver(true);
        setSelectCell([]);
      } else {
        setSeconds(0);
        console.log("insert new");
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
          <div className={styles.box}>
            <div className={styles.left_box}>
              <Show classString={"achieved_sum"} valueShow={achievedSum} />
            </div>
            <div className={styles.right_box}>
              <Show classString={"current_sum"} valueShow={showCurrentSum} />
            </div>
          </div>
          {isGameOver ? (
            <div className={styles.total_score}>
              <p>Game Over</p>
              <p>Final Score: {score}</p>
            </div>
          ) : (
            <div className={styles.total_score}>SCORE: {score}</div>
          )}
          {seconds}
          {/* <Timer /> */}
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
                      isActive={checkIfActive(index, sIndex, selectCell)}
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
