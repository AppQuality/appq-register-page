import {
  Modal,
  Pagination,
  SortTableSelect,
  Table,
  TableType,
  Text,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "src/redux/provider";
import { currencyTable, getPaidDate } from "src/redux/wallet/utils";
import {
  fetchBootyDetails,
  resetBootyDetails,
  setBootyDetailsModalOpen,
  updateBootyDetailsPagination,
} from "../../../redux/wallet/actionCreator";
import { bootyDetailsColumns } from "./columns";

const activityStyle = {
  maxWidth: "calc(100% - 1em)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const BootyDetailsModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [columns, setcolumns] = useState<TableType.Column[]>([]);
  const [rows, setRows] = useState<TableType.Row[]>([]);

  const bootyDetails = useSelector(
    (state: GeneralState) => state.wallet.bootyDetails,
    shallowEqual
  );
  const open = useSelector(
    (state: GeneralState) => state.wallet.isBootyDetailsModalOpen,
    shallowEqual
  );

  const { results, limit, total, start, order, orderBy } = bootyDetails;

  useEffect(() => {
    if (typeof results !== "undefined") {
      setRows(
        results?.map((r) => {
          const formattedAmount = `${
            r.amount.currency && r.amount.currency in currencyTable
              ? currencyTable[r.amount.currency]
              : r.amount.currency
          } ${r.amount.value?.toFixed(2)}`;
          return {
            key: r.id,
            activityName: {
              title: r.name,
              content: (
                <Text as="div" style={activityStyle}>
                  <b className="aq-text-primary">{r.name}</b>
                </Text>
              ),
            },
            attributionDate: getPaidDate(r.attributionDate),
            amount: {
              title: formattedAmount,
              content: (
                <Text className="aq-text-success ">
                  <b>{formattedAmount}</b>
                </Text>
              ),
            },
          };
        })
      );
    }
  }, [bootyDetails]);

  useEffect(() => {
    if (open) {
      const cols = bootyDetailsColumns(setIsLoading, dispatch, t);
      setcolumns(cols);
      dispatch(fetchBootyDetails()).then(() => setIsLoading(false));
    } else {
      setIsLoading(true);
      dispatch(resetBootyDetails());
    }
  }, [open]);

  const changePagination = (newPage: number) => {
    setIsLoading(true);
    const newStart = limit * (newPage - 1);
    dispatch(updateBootyDetailsPagination(newStart)).then(() =>
      setIsLoading(false)
    );
  };

  return (
    <Modal
      title={t("Booty details")}
      isOpen={open}
      onClose={() => dispatch(setBootyDetailsModalOpen(false))}
      size="large"
    >
      {columns.length > 0 && (
        <SortTableSelect
          order={order}
          orderBy={orderBy}
          columns={columns}
          label={t("Order By", { context: "Sort Table Select" })}
        />
      )}
      <Table
        dataSource={rows}
        columns={columns}
        orderBy={orderBy}
        order={order}
        isLoading={isLoading}
        isStriped
      />
      <Pagination
        className="aq-pt-3"
        onPageChange={changePagination}
        current={start / limit + 1}
        maxPages={Math.ceil(total / limit)}
        mobileText={(current, total) =>
          t(`Page %current% / %total%`)
            .replace("%current%", current.toString())
            .replace("%total%", total ? total.toString() : "0")
        }
      />
    </Modal>
  );
};
