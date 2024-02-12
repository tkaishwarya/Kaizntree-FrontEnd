import { useState } from "react";
import { InputCheckbox } from "../InputCheckbox";
import { TransactionPaneComponent } from "./types";

export const TransactionPane: TransactionPaneComponent = ({
  transaction,
  loading,
  setTransactionApproval: consumerSetTransactionApproval,
  onApprovalChange,  // New prop for the parent callback
}) => {
  const [approved, setApproved] = useState(transaction.approved);

  const handleApprovalChange = async (newValue) => {
    await consumerSetTransactionApproval({
      transactionId: transaction.id,
      newValue,
    });

    setApproved(newValue);
    onApprovalChange(transaction.id, newValue); // Notify parent component of the change
  };

  return (
    <div className="KaizntreePane">
      <div className="KaizntreePane--content">
        <p className="KaizntreeText">{transaction.merchant}</p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="KaizntreeText--hushed KaizntreeText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox
        id={transaction.id}
        checked={approved}
        disabled={loading}
        onChange={handleApprovalChange}
      />
    </div>
  );
};

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

