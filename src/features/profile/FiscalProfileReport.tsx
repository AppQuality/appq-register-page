import { useTranslation } from "react-i18next";
import {
  Text,
  Button,
  Title,
  Card,
} from "@appquality/appquality-design-system";
import { useSelector, shallowEqual } from "react-redux";

interface FiscalProfileReportProps {
  setActiveTab: () => void;
}

export const FiscalProfileReport = ({
  setActiveTab,
}: FiscalProfileReportProps) => {
  const fiscalData = useSelector(
    (state: GeneralState) => state.user.fiscal.data,
    shallowEqual
  );
  return (
    <>
      {fiscalData?.fiscalStatus ? (
        fiscalData.fiscalStatus.toLowerCase() !== "verified" ? (
          <UnVerifiedFiscalProfile setActiveTab={setActiveTab} />
        ) : null
      ) : (
        <EmptyFiscalProfile setActiveTab={setActiveTab} />
      )}
    </>
  );
};

const EmptyFiscalProfile = ({ setActiveTab }: FiscalProfileReportProps) => {
  const { t } = useTranslation();
  return (
    <Card className="stick-to-header-lg aq-mb-3" shadow={true}>
      <Title size="xs" className="aq-mb-2">
        {t("Status of user fiscal profile:::Fiscal Profile Report")}
      </Title>
      <Text color="danger">
        <strong>{t("Status of user fiscal profile:::Empty profile")}</strong>
      </Text>
      <Text className="aq-mb-3">
        {t("You need to fill in your tax profile data to receive your booty")}
      </Text>
      <Button flat size="block" onClick={setActiveTab}>
        {t("Fill in now")}
      </Button>
    </Card>
  );
};
const UnVerifiedFiscalProfile = ({
  setActiveTab,
}: FiscalProfileReportProps) => {
  const { t } = useTranslation();
  return (
    <Card className="stick-to-header-lg aq-mb-3" shadow={true}>
      <Title size="xs" className="aq-mb-2">
        {t("Status of user fiscal profile:::Fiscal Profile Report")}
      </Title>
      <Text color="warning">
        <strong>{t("Invalid fiscal profile")}</strong>
      </Text>
      <Text className="aq-mb-3">
        {t("submitted data are incorrect or incomplete. Check your data again")}
      </Text>
      <Button flat size="block" onClick={setActiveTab}>
        {t("Check your data")}
      </Button>
    </Card>
  );
};
const VerifiedFiscalProfile = () => {
  const { t } = useTranslation();
  return (
    <Card className="stick-to-header-lg aq-mb-3" shadow={true}>
      <Title size="xs" className="aq-mb-2">
        {t("Fiscal Profile Report")}
      </Title>
      <Text color="success">
        <strong>{t("Valid tax profile")}</strong>
      </Text>
      <Text>
        {t(
          'You can view your profile summary and make changes if necessary in the "Tax" section of your profile.'
        )}
      </Text>
    </Card>
  );
};
