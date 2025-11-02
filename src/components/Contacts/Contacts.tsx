import classNames from "classnames";

import EmailIcon from "@/assets/email-icon.svg";
import InstagramIcon from "@/assets/instagram-icon.svg";
import PhoneIcon from "@/assets/phone-icon.svg";
import TelegramIcon from "@/assets/telegram-icon.svg";
import {
  BOT_LINK,
  CALL_CENTER_NUMBER,
  INSTAGRAM_LINK,
  POST_ADDRESS,
} from "@/constants";

import styles from "./styles.module.css";

interface IProps {
  variant?: "primary" | "secondary";
}

const Contacts = ({ variant = "primary" }: IProps) => {
  return (
    <ul className={classNames(styles["list"], styles[variant])}>
      <li className={styles["list-item"]}>
        <a href={`tel:${CALL_CENTER_NUMBER}`}>
          <div className={styles["icon-wrapper"]}>
            <PhoneIcon />
          </div>
          {CALL_CENTER_NUMBER}
        </a>
      </li>
      <li className={styles["list-item"]}>
        <a href={`mailto:${POST_ADDRESS}`}>
          <div className={styles["icon-wrapper"]}>
            <EmailIcon />
          </div>
          {POST_ADDRESS}
        </a>
      </li>
      <li className={styles["list-item"]}>
        <a href={INSTAGRAM_LINK}>
          <div className={styles["icon-wrapper"]}>
            <InstagramIcon />
          </div>
          @azpulmat_promo.az
        </a>
      </li>
      <li className={styles["list-item"]}>
        <a href={BOT_LINK}>
          <div className={styles["icon-wrapper"]}>
            <TelegramIcon />
          </div>
          Azpulmat_bot
        </a>
      </li>
    </ul>
  );
};

export default Contacts;
