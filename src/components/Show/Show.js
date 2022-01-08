import styles from "./Show.module.scss";
import { cx } from "../../utils/globalFunctions";

export default function Show({ valueShow, classString }) {
  return (
    <div className={cx(styles.achieved_sum, styles[classString])}>
      <p>{valueShow}</p>
    </div>
  );
}
