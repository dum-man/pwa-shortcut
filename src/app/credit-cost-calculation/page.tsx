import { useTranslations } from "next-intl";

import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations("creditCostCalculation");

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("title.1")}</h2>

        <h3 className={styles["subtitle"]}>{t("subtitle.1")}</h3>

        <div className={styles["table-wrapper"]}>
          <table className={styles["table"]}>
            <thead>
              <tr>
                <th>{t("table.1.th.1")}</th>
                <th>{t("table.1.th.2")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20 - 500</td>
                <td>0.30%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />

        <p
          className={styles["text"]}
          dangerouslySetInnerHTML={{ __html: t.raw("text.1") }}
        />
        <p
          className={styles["text"]}
          dangerouslySetInnerHTML={{ __html: t.raw("text.2") }}
        />

        <p
          className={styles["text"]}
          dangerouslySetInnerHTML={{ __html: t.raw("text.3") }}
        />

        <div className={styles["table-wrapper"]}>
          <table className={styles["table"]}>
            <thead>
              <tr>
                <th>{t("table.2.th.1")}</th>
                <th>{t("table.2.th.2")}</th>
                <th>{t("table.2.th.3")}</th>
                <th>{t("table.2.th.4")}</th>
                <th>{t("table.2.th.5")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5</td>
                <td rowSpan={5}>150</td>
                <td>22.50</td>
                <td></td>
                <td>22.50</td>
              </tr>
              <tr>
                <td>15</td>
                <td>22.50</td>
                <td>4.50</td>
                <td>27.00</td>
              </tr>
              <tr>
                <td>25</td>
                <td>30.00</td>
                <td>9.00</td>
                <td>39.00</td>
              </tr>
              <tr>
                <td>35</td>
                <td>37.50</td>
                <td>13.50</td>
                <td>51.00</td>
              </tr>
              <tr>
                <td>45</td>
                <td>45.00</td>
                <td>18</td>
                <td>63</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <br />

        {/* <h3 className={styles["subtitle"]}>{t("subtitle.2")}</h3>

        <div className={styles["table-wrapper"]}>
          <table className={styles["table"]}>
            <thead>
              <tr>
                <th>{t("table.1.th.1")}</th>
                <th>{t("table.1.th.2")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>50 - 1500</td>
                <td>0,50%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />

        <p
          className={styles["text"]}
          dangerouslySetInnerHTML={{ __html: t.raw("text.4") }}
        />

        <div className={styles["table-wrapper"]}>
          <table className={styles["table"]}>
            <thead>
              <tr>
                <th>{t("table.2.th.1")}</th>
                <th>{t("table.2.th.2")}</th>
                <th>{t("table.2.th.3")}</th>
                <th>{t("table.2.th.4")}</th>
                <th>{t("table.2.th.5")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5</td>
                <td rowSpan={4}>400</td>
                <td rowSpan={4}>48</td>
                <td></td>
                <td>48</td>
              </tr>
              <tr>
                <td>10</td>
                <td>10</td>
                <td>58</td>
              </tr>
              <tr>
                <td>20</td>
                <td>30</td>
                <td>78</td>
              </tr>
              <tr>
                <td>30</td>
                <td>50</td>
                <td>98</td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </section>
  );
};

export default Page;
