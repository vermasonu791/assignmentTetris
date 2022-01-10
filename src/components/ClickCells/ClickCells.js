import styles from "./ClickCells.module.scss";
import { cx } from "../../utils/globalFunctions";
export default function ClickCells({
  isActive,
  cellValue,
  rowValue,
  colValue,
  clicked,
  disable
}) {
  return (
    <div
      className={cx(
        styles.clickable_cell,
        cellValue != 0 ? styles.add_hover : ""
      )}
    >
      {cellValue != 0 && (
        <button
          type="button"
          onClick={e => {
            clicked(e);
          }}
          value={cellValue}
          data-rowindex={rowValue}
          data-colindex={colValue}
          disabled={disable}
          className={cx(
            cellValue != 0 ? styles.animation : styles.disappear,
            isActive ? styles.is_active : ""
          )}
        >
          {cellValue}
        </button>
      )}
    </div>
  );
}
