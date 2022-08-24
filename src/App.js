import InvoiceApp from "./InvoiceApp";
import { createContext, useEffect, useState } from "react";
import { CustomerApi, InvoiceApi, ItemApi } from "./Utils/Network";
export const EntityDetailsContext = createContext();

function App() {
  const [customerList, setCustomerList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const propsValue = {
    customerList,
    setCustomerList,
    itemList,
    setItemList,
    invoiceList,
    setInvoiceList,
  };
  useEffect(() => {
    CustomerApi(setCustomerList);
    ItemApi(setItemList);
    InvoiceApi(setInvoiceList);
  }, []);
  return (
    <div>
      <EntityDetailsContext.Provider value={propsValue}>
        <InvoiceApp />
      </EntityDetailsContext.Provider>
    </div>
  );
}

export default App;
