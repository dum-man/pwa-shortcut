import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getBeneficiaryQuestionnaire } from "@/store/slices/questionnaireSlice";
import { Spinner } from "@/ui";

import Questions from "../Questions/Questions";
import styles from "./styles.module.css";

const Questionnaire = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getBeneficiaryQuestionnaire()).unwrap();
        setIsLoading(false);
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
        router.replace(AppRoutes.Main);
      }
    })();
  }, [dispatch, router]);

  if (isLoading) {
    return <Spinner fullSize />;
  }

  return (
    <section className={styles["section"]}>
      <Questions />
    </section>
  );
};

export default Questionnaire;
