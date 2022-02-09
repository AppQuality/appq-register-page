import { Container, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import JoinInButton from "../JoinInButton";
import { ReactComponent as Alarm } from "./assets/alarm.svg";
import background from "./assets/background.png";
import { ReactComponent as Devices } from "./assets/devices.svg";
import { ReactComponent as List } from "./assets/list.svg";
import { ReactComponent as Wallet } from "./assets/wallet.svg";
import GenericCard from "./GenericCard";

const JoinTryberContainer = styled.div`
  padding: 90px 80px;
  background: url(${background}) no-repeat;
  ${Title},${Text} {
    color: #fff;
  }
  ${Title}.main {
    font-size: 50px;
  }
  ${Text}.claim {
    font-size: 22px;
  }
  .cardlist {
    display: flex;
    justify-content: space-between;
    margin-top: 80px;
    margin-bottom: 60px;
  }
  ${GenericCard} {
    max-width: 20%;
  }
`;

export const HowToJoinTryber = () => {
  const { t } = useTranslation();
  return (
    <JoinTryberContainer>
      <Container>
        <Title
          size="l"
          className="main text-marker aq-text-center aq-mt-3 aq-mb-2"
        >
          {t("Join Tryber is simple")}
        </Title>
        <Text className="aq-text-center claim">
          {t(
            "So what’s in it for you? New skills, free training, good money… and the opportunity to help the brands you use every day improve the user experience of their products and services."
          )}
        </Text>
        <div className="cardlist">
          <GenericCard icon={<Devices />} title={t("STEP 1")}>
            {t("Sign up for the community by hitting the button below.")}
          </GenericCard>
          <GenericCard icon={<Alarm />} title={t("STEP 2")}>
            {t("Complete your profile. The more we know about you!")}
          </GenericCard>
          <GenericCard icon={<List />} title={t("STEP 3")}>
            {t(
              "Complete the free training to learn about our platform and become an expert."
            )}
          </GenericCard>
          <GenericCard icon={<Wallet />} title={t("STEP 4")}>
            {t("Join campaigns and start earning money!")}
          </GenericCard>
        </div>
        <div className="aq-text-center">
          <JoinInButton />
        </div>
        <Title size="s" className="text-marker disclaimer aq-text-center">
          {t("It's totally free!")}
        </Title>
      </Container>
    </JoinTryberContainer>
  );
};
