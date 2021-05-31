import { useEffect, useState } from "react";
import { Container, BSGrid, BSCol } from "../stories/layout/Layout";
import { Card } from "../stories/card/Card";
import { Spinner, SpinnerWrapper } from "../stories/spinner/Spinner";
import { SmallTitle } from "../stories/typography/Typography";
import { useTranslation } from "react-i18next";
import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";
import TesterSidebar from "../features/TesterSidebar";
import MyBugsTable from "../features/my-bugs/MyBugsTable";
import MyBugsFilters from "../features/my-bugs/MyBugsFilters";
import { useMyBugs } from "../store/useMyBugs";
import { useUser } from "../store/useUser";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const tagManagerArgs = {
  dataLayer: {
    role: "unknown",
    wp_user_id: 0,
    tester_id: 0,
    is_admin_page: false,
  },
  dataLayerName: "PageDataLayer",
};

export default function MyBugs() {
  const { search } = useLocation();
  const { user, error } = useUser();
  const [isLoading, setisLoading] = useState(true);

  const { t } = useTranslation();
  const {
    data,
    page,
    totalBugs,
    limit,
    campaigns,
    severities,
    status,
    loading,
    order,
    orderBy,
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
    const values = queryString.parse(search);
    if (values.cp) {
      campaigns.setSelected({ value: values.cp.toString(), label: "" });
    }
    if (values.status) {
      status.setSelected({ value: values.status.toString(), label: "" });
    }
  }, []);

  useEffect(() => {
    if (user) {
      tagManagerArgs.dataLayer = {
        role: user.role,
        wp_user_id: user.wp_user_id,
        tester_id: user.id,
        is_admin_page: false,
      };
    }
    TagManager.dataLayer(tagManagerArgs);
  }, [user]);

  useEffect(() => {
    if (user) {
      setisLoading(false);
      if (user) {
        tagManagerArgs.dataLayer = {
          role: user.role,
          wp_user_id: user.wp_user_id,
          tester_id: user.id,
          is_admin_page: false,
        };
      }
    } else {
      if (error) {
        if (error.statusCode === 403) {
          window.location.href = "/";
        } else {
          alert(error.message);
        }
      }
    }
  }, [user, error]);

  if (isLoading) {
    return (
      <>
        {helmet}
        <TesterSidebar route={"MyBugs"} openFromHeader={false}>
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
      <TesterSidebar route={"MyBugs"} openFromHeader={false}>
        <Container>
          <h2>{t("My Bugs")}</h2>
          <BSGrid>
            <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
              <Card title={t("Submitted bugs")}>
                <MyBugsTable
                  data={data.current}
                  page={page.current}
                  setPage={page.set}
                  totalBugs={totalBugs}
                  limit={limit.current}
                  loading={loading}
                  order={order}
                  orderBy={orderBy}
                />
              </Card>
            </BSCol>
            <BSCol size="col-lg-3">
              <Card
                className="stick-to-header-lg mb-3"
                title={t("Search and filters")}
                shadow={true}
              >
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
