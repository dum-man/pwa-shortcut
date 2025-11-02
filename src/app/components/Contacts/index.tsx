import { useTranslations } from "next-intl";

import EmailIcon from "@/assets/email-icon.svg";
import GeolocationIcon from "@/assets/geolocation-icon.svg";
import InstagramIcon from "@/assets/instagram-icon.svg";
import PhoneIcon from "@/assets/phone-icon.svg";
import TelegramIcon from "@/assets/telegram-icon.svg";
import {
  BOT_LINK,
  CALL_CENTER_NUMBER,
  CALL_CENTER_NUMBER_2,
  INSTAGRAM_LINK,
  POST_ADDRESS,
} from "@/constants";

import styles from "./styles.module.css";

const Contacts = () => {
  const t = useTranslations();

  return (
    <section id="contacts" className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("contacts.title.1")}</h2>
        <ul className={styles["list"]}>
          <li className={styles["list-item"]}>
            <a href={`tel:${CALL_CENTER_NUMBER}`}>
              <div className={styles["icon-wrapper"]}>
                <PhoneIcon />
              </div>
              {CALL_CENTER_NUMBER}
            </a>
          </li>
          <li className={styles["list-item"]}>
            <a href={`tel:${CALL_CENTER_NUMBER_2}`}>
              <div className={styles["icon-wrapper"]}>
                <PhoneIcon />
              </div>
              {CALL_CENTER_NUMBER_2}
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
            <a href={INSTAGRAM_LINK} target="_blank">
              <div className={styles["icon-wrapper"]}>
                <InstagramIcon />
              </div>
              @azpulmat_promo.az
            </a>
          </li>
          <li className={styles["list-item"]}>
            <a href={BOT_LINK} target="_blank">
              <div className={styles["icon-wrapper"]}>
                <TelegramIcon />
              </div>
              Azpulmat_bot
            </a>
          </li>
          <li className={styles["list-item"]}>
            <a>
              <div className={styles["icon-wrapper"]}>
                <GeolocationIcon />
              </div>
              <p dangerouslySetInnerHTML={{ __html: t("common.address") }} />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Contacts;
