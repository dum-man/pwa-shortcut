import { useEffect, useState } from "react";

function useIsAndroid() {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    setIsAndroid(/android/i.test(navigator.userAgent));
  }, []);

  return isAndroid;
}

export default useIsAndroid;
