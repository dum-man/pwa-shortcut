import { useTranslations } from "next-intl";
import Link from "next/link";

import { AppRoutes } from "@/config/routes";
import { useAppSelector } from "@/hooks";

import CreditButton from "../CreditButton/CreditButton";
import CreditHistory from "../CreditHistory/CreditHistory";
import UserInfo from "../UserInfo/UserInfo";
import styles from "./styles.module.css";

const User = () => {
  const t = useTranslations("user");

  const activeCredit = useAppSelector((state) => state.credit.activeCredit);

  return (
    <div className={styles["wrapper"]}>
      <h2 className={styles["title"]}>{t("title.1")}</h2>
      <UserInfo />
      <Link href={AppRoutes.UserVerify} className={styles["link"]}>
        {t("action.1")}
      </Link>
      {!activeCredit && <CreditButton className={styles.btn} />}
      <CreditHistory />
    </div>
  );
};

export default User;
