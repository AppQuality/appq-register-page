import React, { useEffect } from "react";
import { Container, BSGrid, BSCol } from "../stories/layout/Layout";
import { Card } from "../stories/card/Card";
import Spinner from "../stories/spinner/Spinner";
import { SmallTitle } from "../stories/typography/Typography";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";
import TesterSidebar from "../features/TesterSidebar";
import MyBugsTable from "../features/my-bugs/MyBugsTable";
import MyBugsFilters from "../features/my-bugs/MyBugsFilters";
import { useMyBugs } from "../store/useMyBugs";

const tagManagerArgs = {
  dataLayer: {
    role: "unknown",
    wp_user_id: false,
    tester_id: false,
    is_admin_page: false,
  },
  dataLayerName: "PageDataLayer",
};

export default function MyBugs() {
  const { t, i18n } = useTranslation();
  const {
    data,
    order,
    orderBy,
    page,
    totalBugs,
    limit,
    campaigns,
    severities,
    status,
  } = useMyBugs();

  const helmet = () => {
    return (
      <Helmet>
        <title>{t("My Bugs")} - AppQuality Crowd</title>
        <meta property="og:title" content={t("My Bugs")} />
        <meta name="description" content={t("My Bugs")} />
      </Helmet>
    );
  };

  useEffect(() => {
    TagManager.dataLayer(tagManagerArgs);
  }, []);

  const SpinnerWrapper = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    min-height: 60vh;
  `;
  if (false) {
    return (
      <>
        {helmet}
        <TesterSidebar>
          <Container>
            <SpinnerWrapper>
              <Spinner />
              <SmallTitle as="h5">{t("loading")}</SmallTitle>
            </SpinnerWrapper>
          </Container>
        </TesterSidebar>
      </>
    );
  }
  return (
    <>
      {helmet}
      <TesterSidebar>
        <Container>
          <h2>{t("My Bugs")}</h2>
          <BSGrid>
            <BSCol size="col-lg-9 col-xxl-8">
              <Card>
                <MyBugsTable
                  data={data.current}
                  page={page.current}
                  totalBugs={totalBugs}
                  limit={limit.current}
                />
              </Card>
            </BSCol>
            <BSCol size="col-lg-3 col-xxl-4">
              <Card>
                <MyBugsFilters
                  campaigns={campaigns}
                  severities={severities}
                  status={status}
                />
              </Card>
            </BSCol>
          </BSGrid>
        </Container>
      </TesterSidebar>
    </>
  );
}
