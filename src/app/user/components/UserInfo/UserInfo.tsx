import { useTranslations } from "next-intl";
import Image from "next/image";

import { useAppSelector } from "@/hooks";
import { formatDate, formatPhoneNumber } from "@/utils/formats";

import styles from "./styles.module.css";

const UserInfo = () => {
  const t = useTranslations("user");

  const userInfo = useAppSelector((state) => state.user.info);
  const userPhoto = useAppSelector((state) => state.user.photo);

  if (userInfo) {
    const { name, surname, middleName, birthDate, phone, email } = userInfo;

    return (
      <div className={styles["wrapper"]}>
        {userPhoto && (
          <Image src={userPhoto} width={200} height={300} alt="User" />
        )}
        <div className={styles["lists-wrapper"]}>
          <ul className={styles["list-1"]}>
            <li>
              {t("text.1")}
              <p>{surname}</p>
            </li>
            <li>
              {t("text.2")}
              <p>{name}</p>
            </li>
            <li>
              {t("text.3")}
              <p>{middleName ? middleName : "---"}</p>
            </li>
          </ul>
          <ul className={styles["list-2"]}>
            <li>
              {t("text.4")}
              <p>{formatDate(birthDate)}</p>
            </li>
            <li>
              {t("text.5")}
              <p>{formatPhoneNumber(phone)}</p>
            </li>
            <li>
              E-mail:
              <p>{email ? email : "---"}</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return null;
};

export default UserInfo;
