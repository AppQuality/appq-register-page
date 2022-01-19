import { Button } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { StyledCta } from "../_styles";

export default () => {
  const { t, i18n } = useTranslation();
  return (
    <StyledCta>
      <Button
        forwardedAs="a"
        href={`${window.location.origin}/${
          i18n.language == "en" ? "" : `${i18n.language}/`
        }getting-started/`}
        type="primary"
        size="block"
      >
        {t("Join the Team")}
      </Button>
    </StyledCta>
  );
};
