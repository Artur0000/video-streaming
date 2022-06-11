import { Link } from "components/Link";
import styles from "./styles.module.css";

export const AboutUs = () => (
  <div className={styles.container}>
    <h2>About us</h2>
    <span>Developed by: Arthur Grigoryan</span>
    <span>
      Linkedin:{" "}
      <Link href="https://www.linkedin.com/in/artur-grigoryan-b6643b148/">
        artur-grigoryan-b6643b148
      </Link>
    </span>
    <span>
      Email:{" "}
      <Link href="mailto:arturgrigoryan0000@gmail.com">
        arturgrigoryan0000@gmail.com
      </Link>
    </span>
  </div>
);
