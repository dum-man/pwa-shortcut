import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useState } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { useAppDispatch, useInput, useNumberInput, useSelect } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import {
  addUserProfile,
  getProfileQuestions,
  getUserState,
} from "@/store/slices/userSlice";
import { IProfileQuestion, ProfileQuestionType } from "@/types/user";
import { Button, CurrencyInput, Input, Select } from "@/ui";
import { getUserRoute } from "@/utils";

import styles from "./styles.module.css";

const yesNoOptions = [
  { label: "Bəli", value: "yes" },
  { label: "Xeyr", value: "no" },
];

const platformsAndRegionsOptions = [
  {
    value: "1",
    label:
      "İstehlak (Telefon alışı. Təmir. Dərman və tibbi vasitələrinin alışı. Əyləncə xərci. - Ərzaq alışı. Gündəlik tələbatın qarşılanması və s.)",
  },
  { value: "2", label: "Təhsil" },
  { value: "3", label: "Geyim" },
  { value: "4", label: "Səyahət" },
  { value: "5", label: "Digər" },
];

const Questionnaire = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const formId = useId();

  const [profileQuestions, setProfileQuestions] = useState<IProfileQuestion[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [isNameChanged, isNameChangedChange, isNameChangedErrorSet] =
    useSelect();
  const [changedName, changedNameChange, changedNameErrorSet] = useInput();
  const [userAddress, userAddressChange, userAddressErrorSet] = useInput();
  const [userWorkplace, userWorkplaceChange, userWorkplaceErrorSet] =
    useInput();
  const [incomeSum, incomeSumChange, incomeSumErrorSet] = useNumberInput();
  const [otherIncomeSources, otherIncomeSourcesChange] = useInput();
  const [otherIncomeSourcesSum, otherIncomeSourcesSumChange] = useNumberInput();

  const [
    isTransfersInformation,
    isTransfersInformationChange,
    isTransfersInformationErrorSet,
  ] = useSelect();
  const [
    transfersInformationGoals,
    transfersInformationGoalsChange,
    transfersInformationGoalsErrorSet,
  ] = useInput();
  const [transfersInformationAmount, setTransfersInformationAmount] =
    useState("0");

  const [isPolitician, isPoliticianChange, isPoliticianErrorSet] = useSelect();
  const [
    politicallyExposedCategory,
    politicallyExposedCategoryChange,
    politicallyExposedCategoryErrorSet,
  ] = useSelect();

  const [
    platformsAndRegions,
    platformsAndRegionsChange,
    platformsAndRegionsErrorSet,
  ] = useSelect();
  const [
    purposeOfEstablishingBusinessRelationship,
    purposeOfEstablishingBusinessRelationshipChange,
    purposeOfEstablishingBusinessRelationshipErrorSet,
  ] = useSelect();

  const [
    hasCriminalRecord,
    hasCriminalRecordChange,
    hasCriminalRecordErrorSet,
  ] = useSelect();
  const [criminalArticle, criminalArticleChange, criminalArticleErrorSet] =
    useSelect();

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (isLoading) {
      return;
    }

    sendYMEvent(YMEvent.MainInfoClCreditFinal);

    let hasError = false;

    const isNameChangedValue = isNameChanged.value.value;
    const formattedChangedName = changedName.value.trim();
    const formattedUserAddress = userAddress.value.trim();
    const formattedUserWorkplace = userWorkplace.value.trim();
    const formattedIncomeSum = incomeSum.value.trim();

    const isTransfersInformationValue = isTransfersInformation.value.value;
    const formattedTransfersInformationGoals = transfersInformationGoals.value;
    const isPoliticianValue = isPolitician.value.value;
    const platformsAndRegionsValue = platformsAndRegions.value.label;
    const hasCriminalRecordValue = hasCriminalRecord.value.value;

    if (!isNameChangedValue) {
      hasError = true;
      isNameChangedErrorSet();
    }

    if (isNameChangedValue === "yes" && !formattedChangedName) {
      hasError = true;
      changedNameErrorSet();
    }

    if (!formattedUserAddress) {
      hasError = true;
      userAddressErrorSet();
    }

    if (!formattedUserWorkplace) {
      hasError = true;
      userWorkplaceErrorSet();
    }

    if (!formattedIncomeSum) {
      hasError = true;
      incomeSumErrorSet();
    }

    if (!isTransfersInformationValue) {
      hasError = true;
      isTransfersInformationErrorSet();
    }

    if (
      isTransfersInformationValue === "yes" &&
      !formattedTransfersInformationGoals
    ) {
      hasError = true;
      transfersInformationGoalsErrorSet();
    }

    if (!isPoliticianValue) {
      hasError = true;
      isPoliticianErrorSet();
    }

    if (
      isPoliticianValue === "yes" &&
      !politicallyExposedCategory.value.value
    ) {
      hasError = true;
      politicallyExposedCategoryErrorSet();
    }

    if (!platformsAndRegionsValue) {
      hasError = true;
      platformsAndRegionsErrorSet();
    }

    if (
      platformsAndRegionsValue === "Digər" &&
      !purposeOfEstablishingBusinessRelationship.value.value
    ) {
      hasError = true;
      purposeOfEstablishingBusinessRelationshipErrorSet();
    }

    if (!hasCriminalRecordValue) {
      hasError = true;
      hasCriminalRecordErrorSet();
    }

    if (hasCriminalRecordValue === "yes" && !criminalArticle.value.value) {
      hasError = true;
      criminalArticleErrorSet();
    }

    if (hasError) {
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(
        addUserProfile({
          wasFullnameChanged: isNameChangedValue === "yes",
          currentAddress: formattedUserAddress,
          workplaceAndPosition: formattedUserWorkplace,
          incomeSum: Number(formattedIncomeSum),
          otherIncomeSources: otherIncomeSources.value.trim(),
          otherIncomeSourcesSum: Number(otherIncomeSourcesSum.value),
          changedName: formattedChangedName,
          email: "",

          hasInternationalTransfers: isTransfersInformationValue === "yes",
          transfersInformation:
            isTransfersInformationValue === "yes"
              ? transfersInformationGoals.value
              : null,
          transfersAmount:
            isTransfersInformationValue === "yes"
              ? Number(transfersInformationAmount)
              : 0,

          isPolitician: isPoliticianValue === "yes",
          politicallyExposedCategoryId:
            isPoliticianValue === "yes"
              ? Number(politicallyExposedCategory.value.value)
              : null,

          platformsAndRegions: platformsAndRegionsValue,
          purposeOfEstablishingBusinessRelationshipId:
            platformsAndRegionsValue === "Digər"
              ? Number(purposeOfEstablishingBusinessRelationship.value.value)
              : null,

          hasCriminalRecord: hasCriminalRecordValue === "yes",
          criminalArticleId:
            hasCriminalRecordValue === "yes"
              ? Number(criminalArticle.value.value)
              : null,
        })
      ).unwrap();
      const userState = await dispatch(getUserState()).unwrap();
      const route = getUserRoute(userState);
      router.replace(route);
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(getProfileQuestions()).unwrap();
        setProfileQuestions(response);
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
      }
    })();
  }, [dispatch]);

  const politicallyExposedOptions = useMemo(
    () =>
      profileQuestions
        .find(
          ({ type }) => type === ProfileQuestionType.PoliticallyExposedPerson
        )
        ?.answers.map(({ id, answerOption }) => ({
          value: String(id),
          label: answerOption,
        })),
    [profileQuestions]
  );

  const purposeOfEstablishingBusinessRelationshipOptions = useMemo(
    () =>
      profileQuestions
        .find(
          ({ type }) =>
            type ===
            ProfileQuestionType.PurposeOfEstablishingBusinessRelationship
        )
        ?.answers.map(({ id, answerOption }) => ({
          value: String(id),
          label: answerOption,
        })),
    [profileQuestions]
  );

  const criminalArticleOptions = useMemo(
    () =>
      profileQuestions
        .find(({ type }) => type === ProfileQuestionType.CriminalArticle)
        ?.answers.map(({ id, answerOption }) => ({
          value: String(id),
          label: answerOption,
        })),
    [profileQuestions]
  );

  return (
    <>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>Anketi doldurun</h2>
        <p className={styles["text"]}>
          Nəzərinizə çatdırırıq ki, saxta məlumatların qeyd edilməsinə görə
          Azərbaycan Respublikasının qanunvericiliyinə əsasən məsuliyyət
          daşıyırsınız
        </p>
        <form id={formId} className={styles["form"]} onSubmit={handleSubmit}>
          <div className={styles["input-group"]}>
            <Select
              label="Ad Soyad Ata adınızı dəyişmisiniz?"
              placeholder="Seçim edin"
              options={yesNoOptions}
              hasError={isNameChanged.hasError}
              onChange={isNameChangedChange}
            />
            {isNameChanged.value.value === "yes" && (
              <Input
                label="Ad Soyad Ata adı"
                hasError={changedName.hasError}
                value={changedName.value}
                onChange={(evt) => changedNameChange(evt.target.value)}
              />
            )}
          </div>
          <Input
            label="Faktiki yaşadığınız ünvan"
            hasError={userAddress.hasError}
            value={userAddress.value}
            onChange={(evt) => userAddressChange(evt.target.value)}
          />
          <Input
            label="İş yeri və vəzifəniz (işəgötürənin adı daxil olmaqla)"
            note='Əgər iş yeriniz yoxdursa, "İşləmirəm" yaza bilərsiniz'
            hasError={userWorkplace.hasError}
            value={userWorkplace.value}
            onChange={(evt) => userWorkplaceChange(evt.target.value)}
          />
          <CurrencyInput
            label="Orta illik əmək haqqınızın məbləği"
            hasError={incomeSum.hasError}
            value={incomeSum.value}
            onValueChange={incomeSumChange}
          />
          <Input
            label="Digər gəlir mənbələriniz (pensiya, sosial müavinət/yardım, sahibkarlıq fəaliyyəti, depozit və ya onun faizləri, dividend ödənişləri, icarə haqqı, renta haqqı, royalti, miras payı və ya digər)"
            hasError={otherIncomeSources.hasError}
            value={otherIncomeSources.value}
            onChange={(evt) => otherIncomeSourcesChange(evt.target.value)}
          />

          <CurrencyInput
            label="Digər gəlir mənbələri üzrə orta illik gəlirinizin ümumi məbləği"
            hasError={otherIncomeSourcesSum.hasError}
            value={otherIncomeSourcesSum.value}
            onValueChange={otherIncomeSourcesSumChange}
          />

          <div className={styles["input-group"]}>
            <Select
              label="Siz, son 12 ayda xaricə və ya xaricdən pulköçürmə əməliyyatı həyata keçirmisniz?"
              placeholder="Seçim edin"
              options={yesNoOptions}
              hasError={isTransfersInformation.hasError}
              onChange={isTransfersInformationChange}
            />

            {isTransfersInformation.value.value === "yes" && (
              <>
                <div className={styles["radio-wrapper"]}>
                  <p>Məbləğ (manat)</p>
                  <label>
                    <input
                      type="radio"
                      name="transfersInformationAmount"
                      value="60000"
                      checked={transfersInformationAmount === "60000"}
                      onChange={(e) =>
                        setTransfersInformationAmount(e.target.value)
                      }
                    />
                    60 000-dən çox
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="transfersInformationAmount"
                      value="0"
                      checked={transfersInformationAmount === "0"}
                      onChange={(e) =>
                        setTransfersInformationAmount(e.target.value)
                      }
                    />
                    60 000-dən az
                  </label>
                </div>
                <Input
                  label="Köçürmənin və ya qəbul etmənin məqsədləri"
                  maxLength={200}
                  hasError={transfersInformationGoals.hasError}
                  value={transfersInformationGoals.value}
                  onChange={(evt) =>
                    transfersInformationGoalsChange(evt.target.value)
                  }
                />
              </>
            )}
          </div>

          <div className={styles["input-group"]}>
            <Select
              label="Siz siyasi nüfuzlu şəxssiniz? (yaxın qohumlarınız və ya yaxın münasibətdə olduğunuz şəxslər)"
              placeholder="Seçim edin"
              options={yesNoOptions}
              hasError={isPolitician.hasError}
              onChange={isPoliticianChange}
            />
            {isPolitician.value.value === "yes" && (
              <Select
                label="Siz, siyasi nüfuzlu şəxs olaraq, aşağıdakı qeydlərdən hansına uyğun gəlirsiniz?"
                placeholder="Seçim edin"
                options={politicallyExposedOptions}
                hasError={politicallyExposedCategory.hasError}
                onChange={politicallyExposedCategoryChange}
              />
            )}
          </div>

          <div className={styles["input-group"]}>
            <Select
              label="Əldə edilən məbləği istifadə edəcəyiniz sahələr, platformalar"
              placeholder="Seçim edin"
              options={platformsAndRegionsOptions}
              hasError={platformsAndRegions.hasError}
              onChange={platformsAndRegionsChange}
            />
            {platformsAndRegions.value.label === "Digər" && (
              <Select
                label="Digər məqsədlər"
                placeholder="Seçim edin"
                options={purposeOfEstablishingBusinessRelationshipOptions}
                hasError={purposeOfEstablishingBusinessRelationship.hasError}
                onChange={purposeOfEstablishingBusinessRelationshipChange}
              />
            )}
          </div>

          <div className={styles["input-group"]}>
            <Select
              label="Sizin, Cinayət Məcəlləsinin Çirkli pulların yuyulması, cinayət yolu ilə əldə edilmiş əmlakın leqallaşdırılması, terrorçuluğun maliyyələşdirilməsi kimicinayətlərini əks etdirən maddələri ilə məhkumluğunuz var?"
              placeholder="Seçim edin"
              options={yesNoOptions}
              hasError={hasCriminalRecord.hasError}
              onChange={hasCriminalRecordChange}
            />
            {hasCriminalRecord.value.value === "yes" && (
              <Select
                label="Maddəni seçin"
                placeholder="Seçim edin"
                options={criminalArticleOptions}
                hasError={criminalArticle.hasError}
                onChange={criminalArticleChange}
              />
            )}
          </div>
        </form>
      </div>
      <Button
        type="submit"
        size="md"
        variant="primary"
        form={formId}
        isLoading={isLoading}
      >
        Təsdiq etmək
      </Button>
    </>
  );
};

export default Questionnaire;
