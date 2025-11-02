import { redirect } from "next/navigation";

import { AppRoutes } from "@/config/routes";

const NotFound = () => {
  return redirect(AppRoutes.Main);
};

export default NotFound;
