import {
  Pagination,
  Table,
  TableType,
  SortTableSelect,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import useClosedCampaigns from "./effects/useClosedCampaigns";

const ClosedCampaignsTable = () => {
  const { t } = useTranslation();
  const { campaigns, page, totalEntries, limit, loading, order, orderBy } =
    useClosedCampaigns();
  const columns: TableType.Column[] = [
    {
      title: t("Campaign"),
      dataIndex: "campaigns",
      key: "campaigns",
      role: "title",
      hideIndex: true,
    },
    {
      title: t("Close Date"),
      dataIndex: "closeDate",
      key: "closeDate",
      isSortable: true,
      onSort: (sorting: OrderType) => {
        order.set(sorting);
        orderBy.set("closeDate");
      },
    },
  ];
  return (
    <>
      <SortTableSelect
        order={order.current}
        orderBy={orderBy.current}
        columns={columns}
        label={t("Order By", { context: "Sort Table Select" })}
      />
      <Table
        dataSource={campaigns}
        isLoading={loading}
        isStriped={true}
        order={order.current}
        orderBy={orderBy.current}
        i18n={{
          loading: t("Loading Data"),
          empty: t(
            "No campaign has been completed yet. It's time to get to work: finish the active ones or apply in the available campaigns!"
          ),
        }}
        columns={columns}
      />
      {totalEntries > limit ? (
        <Pagination
          className="aq-pt-3"
          onPageChange={page.set}
          current={page.current}
          maxPages={Math.ceil(totalEntries / limit)}
        />
      ) : null}
    </>
  );
};

export default ClosedCampaignsTable;
