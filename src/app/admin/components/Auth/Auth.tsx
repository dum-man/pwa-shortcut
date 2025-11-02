import { useState } from "react";

import { useAppDispatch } from "@/hooks";
import { authAdmin } from "@/store/slices/adminSlice";
import { setErrorModal } from "@/store/slices/appSlice";

import styles from "./styles.module.css";
import { Button } from "@/ui";

const Auth = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (isLoading) {
      return;
    }

    if (!username || !password) {
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(authAdmin({ username, password })).unwrap();
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, errorText: error?.message }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <h3 className={styles["title"]}>Login</h3>
      <form className={styles["form"]} onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <Button size="xs" type="submit" disabled={isLoading}>
          Log in
        </Button>
      </form>
    </div>
  );
};

export default Auth;
