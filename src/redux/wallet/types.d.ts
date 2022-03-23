type WalletState = {
  requestsList: ApiOperations["get-users-me-payments"]["responses"]["200"]["content"]["application/json"] & {
    total: number;
    limit: number;
    order: ApiOperations["get-users-me-payments"]["parameters"]["query"]["order"];
    orderBy: ApiOperations["get-users-me-payments"]["parameters"]["query"]["orderBy"];
  };
  booty: {
    amount: number;
    bootyThreshold?: {
      value: number;
      isOver: boolean;
    };
  };
  isPaymentModalOpen: boolean;
};

type WalletActions =
  | WalletActions_UpdateRequestList
  | WalletActions_UpdateRequestQuery
  | WalletActions_SetBooty
  | WalletActions_TogglePaymentModal;

/**
 *  Action types and their payloads
 */
type WalletActions_UpdateRequestList = {
  type: "wallet/updateRequestsList";
  payload: ApiOperations["get-users-me-payments"]["responses"]["200"]["content"]["application/json"];
};

type WalletActions_SetBooty = {
  type: "wallet/setBooty";
  payload: ApiOperations["get-users-me"]["responses"]["200"]["content"]["application/json"];
};

type WalletActions_UpdateRequestQuery = {
  type: "wallet/updateReqsQuery";
  payload: ApiOperations["get-users-me-payments"]["parameters"]["query"];
};

type WalletActions_TogglePaymentModal = {
  type: "wallet/togglePaymentModal";
  payload: boolean;
};
