import { useEffect } from "react";
import InstallPwaButton from "./InstallPwaButton";

function App() {

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service Worker зарегистрирован:", registration);
          })
          .catch((error) => {
            console.error("Ошибка регистрации Service Worker:", error);
          });
      });
    }

  }, [])

  return (
    <div>
      <h1>Мой сайт</h1>
      <InstallPwaButton />
    </div>
  );
}

export default App;
