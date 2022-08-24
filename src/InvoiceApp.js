import { lazy, Suspense } from "react";
import LeftNavigation from "./Utils/LeftNavigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const LazyCustomer = lazy(() => import("./components/Customer"));
const LazyItem = lazy(() => import("./components/Items"));
const LazyInvoice = lazy(() => import("./components/Invoice"));
const LazyCustomerForm = lazy(() => import("./components/CustomerForm"));
const LazyItemForm = lazy(() => import("./components/ItemForm"));
const LazyInvoiceForm = lazy(() => import("./components/InvoiceForm"));

const InvoiceApp = () => {
  return (
    <div>
      <BrowserRouter>
        <LeftNavigation />
        <Suspense fallback={<h1>Loadding Please Wait ... </h1>}>
          <Routes>
            <Route path="/customer" element={<LazyCustomer />} />
            <Route path="/customer/add" element={<LazyCustomerForm />} />
            <Route path="/item" element={<LazyItem />} />
            <Route path="/item/add" element={<LazyItemForm />} />
            <Route path="/invoice" element={<LazyInvoice />} />
            <Route path="/invoice/add" element={<LazyInvoiceForm />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default InvoiceApp;
