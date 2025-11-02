import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { NumberFormatValues } from "react-number-format";
import { SingleValue } from "react-select";

import { sendYMEvent, YMEvent } from "@/analytics";
import { useAppDispatch, useAppSelector, useInput } from "@/hooks";
import { selectContactTypesForSelect } from "@/selectors";
import { setErrorModal } from "@/store/slices/appSlice";
import { addUserGuarantors, getUserState } from "@/store/slices/userSlice";
import { Button, Input, PhoneInput, Select } from "@/ui";
import { getUserRoute } from "@/utils";
import { phoneFormat } from "@/utils/formats";

import { createDefaultContact } from "../../helpers";
import styles from "./styles.module.css";

const MAX_CONTACTS_LENGTH = 5;

const Contacts = () => {
  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const contactTypes = useAppSelector(selectContactTypesForSelect);

  const [isLoading, setIsLoading] = useState(false);

  const [contacts, setContacts] = useState([
    createDefaultContact(),
    createDefaultContact(),
  ]);

  const [email, emailChange] = useInput();

  const isAddFieldsAllowed = contacts.length < MAX_CONTACTS_LENGTH;

  const handleNameChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    setContacts((prev) => {
      return prev.map((contact, i) => {
        if (idx === i) {
          return {
            ...contact,
            name: evt.target.value.replace(/[0-9]/g, ""),
          };
        }
        return contact;
      });
    });
  };

  const handlePhoneNumberChange = (values: NumberFormatValues, idx: number) => {
    setContacts((prev) => {
      return prev.map((contact, i) => {
        if (idx === i) {
          return {
            ...contact,
            phoneNumber: values.value,
          };
        }
        return contact;
      });
    });
  };

  const handleSelectChange = (
    value: SingleValue<{ id: number; value: string; label: string }>,
    idx: number
  ) => {
    if (!value) {
      return;
    }
    setContacts((prev) => {
      return prev.map((contact, i) => {
        if (idx === i) {
          return {
            ...contact,
            contactTypeId: value.id,
          };
        }
        return contact;
      });
    });
  };

  const addFormField = () => {
    if (!isAddFieldsAllowed) {
      return;
    }
    sendYMEvent(YMEvent.MainSendClContact);
    setContacts((prev) => [...prev, createDefaultContact()]);
  };

  const removeFormField = (idx: number) => {
    setContacts((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (isLoading) {
      return;
    }

    let hasError = false;

    const formattedEmail = email.value.trim();

    const phoneNumbers = new Set();

    const checkedContacts = contacts.map((contact) => {
      if (!contact.name) {
        contact.hasNameError = true;
        hasError = true;
      } else {
        contact.hasNameError = false;
      }

      if (!contact.contactTypeId) {
        contact.hasContactTypeError = true;
        hasError = true;
      } else {
        contact.hasContactTypeError = false;
      }

      if (!phoneFormat.test(contact.phoneNumber)) {
        contact.hasPhoneNumberError = true;
        hasError = true;
      } else {
        contact.hasPhoneNumberError = false;
        phoneNumbers.add(contact.phoneNumber);
      }

      return contact;
    });

    setContacts(checkedContacts);

    if (hasError) {
      return;
    }

    if (checkedContacts.length !== phoneNumbers.size) {
      dispatch(
        setErrorModal({ isOpen: true, errorText: t("errorModal.text.1") })
      );
      return;
    }

    const formattedContacts = checkedContacts.map((contact) => ({
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      contactTypeId: contact.contactTypeId,
    }));

    sendYMEvent(YMEvent.MainSendClContact2);

    setIsLoading(true);

    try {
      await dispatch(
        addUserGuarantors({
          email: formattedEmail,
          guarantors: formattedContacts,
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

  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      <h2 className={styles["title"]}>{t("trustedContacts.title.1")}</h2>
      <ul className={styles["list"]}>
        {contacts.map((contact, idx) => (
          <li key={idx} className={styles["list-item"]}>
            <Input
              pattern="[^0-9]*"
              label={t("trustedContacts.label.1")}
              hasError={contact.hasNameError}
              value={contact.name}
              onChange={(evt) => handleNameChange(evt, idx)}
            />
            <PhoneInput
              variant="secondary"
              label={t("trustedContacts.label.2")}
              allowEmptyFormatting
              hasError={contact.hasPhoneNumberError}
              value={contact.phoneNumber}
              onValueChange={(values) => handlePhoneNumberChange(values, idx)}
            />
            <Select
              label={t("trustedContacts.label.3")}
              placeholder=""
              options={contactTypes}
              hasError={contact.hasContactTypeError}
              onChange={(value) => handleSelectChange(value, idx)}
            />
            {idx > 1 && (
              <button
                className={styles["delete-button"]}
                type="button"
                onClick={() => removeFormField(idx)}
              >
                {t("trustedContacts.action.2")}
              </button>
            )}
          </li>
        ))}
      </ul>
      <Button
        size="sm"
        type="button"
        disabled={!isAddFieldsAllowed}
        onClick={addFormField}
      >
        {t("trustedContacts.action.1")}
      </Button>

      <div className={styles["email-wrapper"]}>
        <h2 className={styles["title"]}>{t("trustedContacts.title.2")}</h2>
        <div className={styles["email-input-wrapper"]}>
          <Input
            label={t("trustedContacts.label.4")}
            type="email"
            value={email.value}
            onChange={(evt) => emailChange(evt.target.value)}
          />
        </div>
      </div>
      <Button type="submit" size="md" variant="primary" isLoading={isLoading}>
        {t("trustedContacts.action.3")}
      </Button>
    </form>
  );
};

export default Contacts;
