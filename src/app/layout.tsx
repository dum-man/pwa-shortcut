import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Montserrat } from "next/font/google";

import App from "@/lib/App";
import ChatScript from "@/lib/ChatScript";
import GtmScript from "@/lib/GtmScript";
import Providers from "@/lib/Providers";
import YmScript from "@/lib/YmScript";
import AndroidComponent from "@/modules/AndroidComponent";
import AppLabelModal from "@/modules/AppLabelModal";
import CameraModal from "@/modules/CameraModal";
import ChangePhoneNumberModal from "@/modules/ChangePhoneNumberModal";
import CreatePasswordModal from "@/modules/CreatePasswordModal";
import DropdownMenu from "@/modules/DropdownMenu";
import ErrorModal from "@/modules/ErrorModal";
import Footer from "@/modules/Footer";
import Header from "@/modules/Header";
import InfoModal from "@/modules/InfoModal";
import Loader from "@/modules/Loader";
import LoginByFinModal from "@/modules/LoginByFinModal";
import LoginModal from "@/modules/LoginModal";
import NewPhoneNumberModal from "@/modules/NewPhoneNumberModal";
import OtpModal from "@/modules/OtpModal";
import PopoverMenu from "@/modules/PopoverMenu";
import RegisterModal from "@/modules/RegisterModal";
import TempPasswordModal from "@/modules/TempPasswordModal";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description:
      "Компания AZPULMAT предлагает взять кредитный займ на карту онлайн, без отказа ✔️ Получить деньги на карту быстро и без проверок ✔️ Займ с плохой кредитной историей и без справок ☎️ 1670",
    openGraph: {
      type: "website",
      siteName: "Azpulmat",
      url: "https://azpul.az",
      title: "24 saat ani onlayn kreditlər",
      description:
        "Azpulmat onlayn bank kreditləşməsinə əlverişli alternativdir",
      images: [
        {
          url: "https://azpul.az/images/og-img.jpg",
        },
      ],
    },
    robots: {
      index: process.env.NEXT_PUBLIC_ENV === "test" ? false : true,
      follow: process.env.NEXT_PUBLIC_ENV === "test" ? false : true,
    },
    manifest: "/manifest.json",
  };
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <ChatScript />
      <GtmScript />
      <YmScript />
      <body className={montserrat.className}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <App>
              <Header />
              <main>{children}</main>
              <Footer />
              <LoginModal />
              <OtpModal />
              <ErrorModal />
              <CameraModal />
              <DropdownMenu />
              <PopoverMenu />
              <Loader />
              <InfoModal />
              <LoginByFinModal />
              <CreatePasswordModal />
              <RegisterModal />
              <NewPhoneNumberModal />
              <TempPasswordModal />
              <ChangePhoneNumberModal />
              <AppLabelModal />
              <AndroidComponent />
            </App>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
