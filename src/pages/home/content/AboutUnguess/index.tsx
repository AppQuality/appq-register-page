import { Button, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import tryber from "./assets/tryber.png";

const SlideContainer = styled.div`
  margin-top: 160px;
  ${Text} {
    font-size: 22px;
    line-height: 1.8;
  }
  ${Button} {
    padding: 18px 42px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bolder;
  }
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left right";
  @media (max-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "left" "right";
  }
`;
const TextContainer = styled.div`
  padding: 16px 26px 110px 26px;
`;
const VideoContainer = styled.div`
  position: relative;
  iframe {
    border-radius: 21px;
    width: 100%;
    height: 100%;
  }
  img.tryber {
    position: absolute;
    top: -30%;
    right: -5%;
  }
`;

export const AboutUnguess = () => {
  const { t, i18n } = useTranslation();
  return (
    <SlideContainer>
      <TextContainer>
        <Title size="xl" className="text-marker">
          {t("__HOME_TITLE_UNGUESS MAX:40")}
        </Title>
        <Text className="aq-my-4">{t("__HOME_PARAGRAPH_UNGUESS MAX:120")}</Text>
      </TextContainer>
      <VideoContainer>
        <iframe
          width="500"
          height="294"
          src="https://www.youtube.com/embed/bPr1XILdV4g"
        ></iframe>
        <img className="tryber" src={tryber} alt="tryber" />
      </VideoContainer>
    </SlideContainer>
  );
};
