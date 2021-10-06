import {
  icons,
  Spinner,
  SpinnerWrapper,
} from "@appquality/appquality-design-system";
import usePerformance from "../../store/dashboard/usePerformance";
import { Statistic, GoToBlock } from "./performanceRow";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useLocalizeRoute } from "../../hooks/useLocalizedRoute";

const StyledIcon = styled.div`
  .dark-disabled-font {
    color: ${(props) => props.theme.colors.disabledDark};
  }
`;

const PerformanceData = () => {
  const { t } = useTranslation();
  const {
    AwardFill,
    BookmarkCheckFill,
    BugFill,
    PiggyBankFill,
    StarFill,
    CashCoin,
    ArrowRight,
  } = icons;
  const {
    expPoints,
    rank,
    cpCompleted,
    bugsApproved,
    allBooty,
    pendingBooty,
    loading,
  } = usePerformance();
  const performanceData = [
    {
      icon: <StarFill size={"21"} className={"aq-text-warning"} />,
      text: t("Experience Points"),
      val: expPoints,
    },
    {
      icon: <AwardFill size={"21"} className={"aq-text-info"} />,
      text: t("Your Rank"),
      val: rank + (isNaN(rank) ? "" : "°"),
    },
    {
      icon: <ArrowRight size={"21"} />,
      text: t("View ranking page"),
      link: `/${
        i18n.language === "en"
          ? "leaderboard"
          : `${i18n.language}/leaderboard-2/`
      }`,
    },
    {
      icon: <BookmarkCheckFill size={"21"} className={"aq-text-secondary"} />,
      text: t("Completed campaigns"),
      val: cpCompleted,
    },
    {
      icon: <BugFill size={"21"} className={"aq-text-danger"} />,
      text: t("Approved bugs"),
      val: bugsApproved,
    },
    {
      icon: <ArrowRight size={"21"} />,
      text: t("View bugs page"),
      link: `${useLocalizeRoute("my-bugs")}`,
    },
    {
      icon: <CashCoin size={"21"} className={"aq-text-success"} />,
      text: t("Received booty"),
      val: allBooty + "€",
    },
    {
      icon: (
        <StyledIcon>
          <PiggyBankFill size={"21"} className={"dark-disabled-font"} />
        </StyledIcon>
      ),
      text: t("Available booty"),
      val: pendingBooty + "€",
    },
    {
      icon: <ArrowRight size={"21"} />,
      text: t("View payments page"),
      link: `${window.location.origin}/${
        i18n.language === "en"
          ? "payments"
          : i18n.language === "it"
          ? "it/pagamenti/"
          : "es/pagos"
      }`,
    },
  ];

  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  }
  return (
    <div>
      {performanceData.map((item, index) =>
        item.link ? (
          <GoToBlock item={item} key={index} />
        ) : (
          <Statistic item={item} key={index} />
        )
      )}
    </div>
  );
};

export default PerformanceData;
