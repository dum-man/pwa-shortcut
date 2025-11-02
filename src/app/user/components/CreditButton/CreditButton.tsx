import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getUserState } from "@/store/slices/userSlice";
import { Button } from "@/ui";
import { getUserRoute } from "@/utils";

interface IProps
  extends Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> {}

const CreditButton = (props: IProps) => {
  const t = useTranslations("common");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const activeCredit = useAppSelector((state) => state.credit.activeCredit);

  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const userState = await dispatch(getUserState()).unwrap();
      const route = getUserRoute(userState);
      router.replace(route);
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  if (!activeCredit) {
    return (
      <Button
        size="xl"
        variant="primary"
        isLoading={isLoading}
        onClick={handleNavigate}
        {...props}
      >
        {t("getMoney")} ₼
      </Button>
    );
  }
  return <br />;
};

export default CreditButton;
