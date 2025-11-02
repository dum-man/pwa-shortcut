import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";

import { sendYMEvent, YMEvent } from "@/analytics";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getAzericardPaymentUrl } from "@/store/slices/azericardSlice";
import { saveBeneficiaryResponse } from "@/store/slices/questionnaireSlice";
import { Button } from "@/ui";

import styles from "./styles.module.css";

const Questions = () => {
  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { clientId, creditId, questions } = useAppSelector(
    (state) => state.questionnaire
  );

  const [isLoading, setIsLoading] = useState(false);

  const [responses, setResponses] = useState(() =>
    questions.map(({ questionId, text, type }) => {
      let response = "";

      switch (type) {
        case "YesNoWithInput":
          response = "Xeyr";
          break;
        case "YesNo":
          response = "Bəli";
          break;
        case "DatePicker":
          response = dayjs(new Date()).format("YYYY-MM-DD");
          break;
        default:
          response = "";
          break;
      }

      return {
        questionId,
        question: text,
        response,
      };
    })
  );

  const handleChange = (value: string, idx: number) => {
    setResponses((prev) => {
      return prev.map((response, i) => {
        if (idx === i) {
          return {
            ...response,
            response: value,
          };
        } else {
          return response;
        }
      });
    });
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isLoading) {
      return;
    }

    sendYMEvent(YMEvent.MainInfoBnClAccess);

    setIsLoading(true);

    try {
      await dispatch(
        saveBeneficiaryResponse({
          clientId,
          creditId,
          responses,
          isSelfBeneficiar: false,
        })
      ).unwrap();
      const azericardUrl = await dispatch(getAzericardPaymentUrl()).unwrap();
      sendYMEvent(YMEvent.LoanIssuedMethodCard);
      router.push(azericardUrl);
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendYMEvent(YMEvent.MainInfoBnCl);
  }, []);

  return (
    <div className={styles["wrapper"]}>
      <h2 className={styles["title"]}>
        {t("beneficiaryQuestionnaire.title.2")}
      </h2>
      <form className={styles["form"]} onSubmit={handleSubmit}>
        <ul className={styles["list"]}>
          {questions.map(
            (
              { questionId, text, inputPlaceholder, type, isRequired, hint },
              idx
            ) => {
              const placeholder = inputPlaceholder ?? undefined;
              const response = responses[idx].response;
              return (
                <li key={questionId}>
                  {(() => {
                    switch (type) {
                      case "Text":
                      case "Alphabetic":
                      case "AlphaNumeric":
                        return (
                          <label className={styles["label"]}>
                            {text}
                            <input
                              type="text"
                              required={isRequired}
                              placeholder={placeholder}
                              value={response}
                              onChange={(evt) =>
                                handleChange(evt.target.value, idx)
                              }
                            />
                          </label>
                        );
                      case "Numeric":
                        return (
                          <label className={styles["label"]}>
                            {text}
                            <input
                              type="number"
                              required={isRequired}
                              placeholder={placeholder}
                              value={response}
                              onChange={(evt) =>
                                handleChange(evt.target.value, idx)
                              }
                            />
                          </label>
                        );
                      case "Email":
                        return (
                          <label className={styles["label"]}>
                            {text}
                            <input
                              type="email"
                              required={isRequired}
                              placeholder={placeholder}
                              value={response}
                              onChange={(evt) =>
                                handleChange(evt.target.value, idx)
                              }
                            />
                          </label>
                        );
                      case "PhoneNumber":
                        return (
                          <label className={styles["label"]}>
                            {text}
                            <PatternFormat
                              allowEmptyFormatting
                              format="+994 ## ### ## ##"
                              required={isRequired}
                              pattern="\+994\s\d{2}\s\d{3}\s\d{2}\s\d{2}"
                              mask="_"
                              value={response}
                              onChange={(evt) =>
                                handleChange(evt.target.value, idx)
                              }
                            />
                          </label>
                        );
                      case "TextWithHint":
                        return (
                          <label className={styles["label"]}>
                            {text}
                            <input
                              required={isRequired}
                              type="text"
                              placeholder={placeholder}
                              value={response}
                              onChange={(evt) =>
                                handleChange(evt.target.value, idx)
                              }
                            />
                            <span>{hint}</span>
                          </label>
                        );
                      case "DatePicker":
                        return (
                          <label className={styles["label"]}>
                            {text}
                            <div className={styles["date-input-wrapper"]}>
                              <input
                                required={isRequired}
                                type="date"
                                value={response}
                                onChange={(evt) =>
                                  handleChange(evt.target.value, idx)
                                }
                              />
                            </div>
                          </label>
                        );
                      case "CardNumber":
                        return (
                          <label className={styles["label"]}>
                            {text}
                            <PatternFormat
                              allowEmptyFormatting
                              format="#### #### #### ####"
                              required={isRequired}
                              pattern="\d{4}\s\d{4}\s\d{4}\s\d{4}"
                              mask="_"
                              onValueChange={(value) =>
                                handleChange(value.value, idx)
                              }
                            />
                          </label>
                        );
                      case "CardExpirationDate":
                        return (
                          <label className={styles["label"]}>
                            {text}
                            <PatternFormat
                              allowEmptyFormatting
                              format="##/##"
                              required={isRequired}
                              pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                              mask="_"
                              onValueChange={(value) =>
                                handleChange(value.value, idx)
                              }
                            />
                          </label>
                        );
                      case "YesNoWithInput":
                        return (
                          <div className={styles["radio-input-wrapper"]}>
                            <p>{text}</p>
                            <div>
                              <label>
                                <input
                                  hidden
                                  type="radio"
                                  name={text}
                                  value="Bəli"
                                  checked={response.split(".")[0] === "Bəli"}
                                  onChange={(evt) =>
                                    handleChange(evt.target.value + ".", idx)
                                  }
                                />
                                <span />
                                {t("beneficiaryQuestionnaire.action.1")}
                              </label>
                              <label>
                                <input
                                  hidden
                                  type="radio"
                                  name={text}
                                  value="Xeyr"
                                  checked={response.split(".")[0] === "Xeyr"}
                                  onChange={(evt) =>
                                    handleChange(evt.target.value, idx)
                                  }
                                />
                                <span />
                                Xeyr
                              </label>
                            </div>
                            {response.split(".")[0] === "Bəli" && (
                              <label className={styles["label"]}>
                                Dəyişiklikdən əvvəlki ad, soyad və ata adını
                                daxil edin
                                <input
                                  type="text"
                                  required
                                  value={response.split(".").at(-1)}
                                  onChange={(evt) => {
                                    handleChange(
                                      `${response.split(".")[0]}.${
                                        evt.target.value
                                      }`,
                                      idx
                                    );
                                  }}
                                />
                              </label>
                            )}
                          </div>
                        );
                      case "YesNo":
                        return (
                          <div className={styles["radio-input-wrapper"]}>
                            <p>{text}</p>
                            <div>
                              <label>
                                <input
                                  hidden
                                  type="radio"
                                  name={text}
                                  value="Bəli"
                                  checked={responses[idx].response === "Bəli"}
                                  onChange={(evt) =>
                                    handleChange(evt.target.value, idx)
                                  }
                                />
                                <span />
                                {t("beneficiaryQuestionnaire.action.1")}
                              </label>
                              <label>
                                <input
                                  hidden
                                  type="radio"
                                  name={text}
                                  value="Xeyr"
                                  checked={responses[idx].response === "Xeyr"}
                                  onChange={(evt) =>
                                    handleChange(evt.target.value, idx)
                                  }
                                />
                                <span />
                                Xeyr
                              </label>
                            </div>
                          </div>
                        );
                      default:
                        return null;
                    }
                  })()}
                </li>
              );
            }
          )}
        </ul>
        <Button type="submit" size="md" variant="primary">
          {t("common.submit")}
        </Button>
      </form>
    </div>
  );
};

export default Questions;
