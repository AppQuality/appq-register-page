import { Header } from "@appquality/appquality-design-system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import menuStore from "../redux/menu";
import userStore from "../redux/user";
import { LoginModal } from "./login-modal/LoginModal";

const SiteHeader = () => {
  const menu = menuStore();
  const { isOpen, toggle } = menu;
  const { user, isLoading } = userStore();
  const [login, setLogin] = useState(false);
  const { i18n, t } = useTranslation();

  const homeUrl = i18n.language === "en" ? "/" : `/${i18n.language}/`;
  return (
    <>
      <Header
        onLogin={() => setLogin(true)}
        isLoading={isLoading}
        logoUrl={homeUrl}
        user={user}
        isMenuOpen={isOpen}
        toggleMenu={toggle}
        loginText={t("login")}
      />
      <LoginModal isOpen={login} onClose={() => setLogin(false)} />
    </>
  );
};

export default SiteHeader;
