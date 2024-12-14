import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import "./fonts.css";
import TransactionCard from "./TransactionCard";
import { useLocation } from "react-router-dom";
import { ReactComponent as PrinterIcon } from "../../assets/svgs/printer.svg";
import UserService from "../../API/user";
import { defaultPersonalData, sampleTransactionData } from "../../hardData";

const TransactionHistoryPage = () => {
  // Initialize state from local storage or as an empty array
  const [transactionData, setTransactionData] = useState([]);
  const [totalA4Papers, setTotalA4Papers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // const { state } = useLocation();
  // const { selectedOption } = state || {};
  // const isInitialMount = useRef(true);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //     return;
  //   }

  //   if (selectedOption && selectedOption.quantity && selectedOption.price) {
  //     const newTransaction = {
  //       transactionId: Date.now(),
  //       time: new Date().toLocaleTimeString(),
  //       date: new Date().toLocaleDateString(),
  //       amount: Number(selectedOption.price).toLocaleString(), // Format amount
  //       currency: "VND",
  //       number: selectedOption.quantity,
  //       transactionType: `Buying Papers (${selectedOption.quantity} papers)`,
  //     };

  //     setTransactionData((prevData) => {
  //       const updatedData = [newTransaction, ...prevData];
  //       localStorage.setItem("transactionData", JSON.stringify(updatedData)); // Save to local storage
  //       return updatedData;
  //     });
  //   }
  // }, [selectedOption]);

  /*    USE EFFECT    */
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      await UserService.getTransactionHistory()
      .then((res) => {
        console.log(res.data);
        setTransactionData(res.data);
      }).catch((err) => {
        console.error(err);
        setTransactionData(sampleTransactionData);
      })

      await UserService.getPersonalInformation()
      .then((res) => {
        setTotalA4Papers(res.data.numberOfA4);
      }).catch((err) => {
        setTotalA4Papers(defaultPersonalData.numberOfA4);
      })

      setIsLoading(false);
    }

    loadData();
  }, [])

  // Calculate totals
  const totalTransactions = transactionData.length;

  
  // Loading page
  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="font-bold text-4xl text-blue">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-5 bg-gray-100 p-6 w-full overflow-y-auto max-h-screen h-screen">
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <Header pageName="Transaction History" description="View your transaction history" className="mb-4" />

        {/* Totals */}
        <div className="flex flex-row justify-between space-x-4 mt-6">
          {/* Total A4 Papers */}
          <div className="flex flex-row justify-between items-center bg-white py-3 px-6 rounded-md shadow-xl w-2/5">
            <PrinterIcon className="w-16 h-16" fill="#808080"/>
            <div className="flex flex-col items-end">
              <div className="text-blue font-bold text-xl mb-3">Number of A4</div>
              <div className="text-gray-600 text-2xl font-bold">{totalA4Papers}</div>
            </div>
          </div>
          {/* Total Transactions */}
          <div className="flex flex-row items-center justify-between bg-white py-3 px-6 rounded-lg shadow-xl w-2/5">
            <PrinterIcon className="w-16 h-16" fill="#808080"/>
            <div className="flex flex-col items-end">
              <div className="text-blue font-bold text-xl mb-3">Number of transactions</div>
              <div className="text-gray-dark text-2xl font-bold">{totalTransactions}</div>
            </div>
          </div>
        </div>

        {/* Transaction History List */}
        <div className="bg-white p-6 shadow-xl rounded-md mt-6">
          <h3 className="text-2xl text-blue font-bold mb-3">History list</h3>
          <div className="space-y-3 max-h-[520px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
            {transactionData.length === 0 ? (
              <p className="text-gray-dark">No transactions found</p>
            ) : (
              transactionData.map((transaction) => (
                <div key={transaction.transaction_id} className="flex flex-row justify-between">
                  <TransactionCard
                    key={transaction.transaction_id}
                    time={transaction.time}
                    description={transaction.title}
                    amount={transaction.payment}
                    transactionId={transaction.transaction_id}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
