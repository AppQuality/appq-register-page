import "./i18n";

import {
  aqBootstrapTheme,
  GlobalStyle,
} from "@appquality/appquality-design-system";
import TagManager from "react-gtm-module";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Page from "./Page";
import Provider from "./redux/provider";

if (process.env.REACT_APP_GTM_ID) {
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID,
  };

  TagManager.initialize(tagManagerArgs);
}

function App() {
  const { t } = useTranslation();
  return (
    <Provider>
      <ThemeProvider theme={aqBootstrapTheme}>
        <GlobalStyle />
        <Helmet>
          <meta
            property="og:title"
            content={"AppQuality Crowd - " + t("Earn money using your devices")}
          />
          <title>AppQuality Crowd - {t("Earn money using your devices")}</title>
          <meta
            name="description"
            content={t(
              "Becoming a part of Crowd AppQuality community is simple: It's not requested a particular profile, is the multiprofile our power."
            )}
          />
        </Helmet>
        <BrowserRouter>
          <Page />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
