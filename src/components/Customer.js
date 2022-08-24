import { useEffect, useContext, useState } from "react";
import { CUSTOMER_COLUMN } from "../Utils/Constants";
import Table from "../Utils/Table";
import { EntityDetailsContext } from "../App";
import { Link } from "react-router-dom";

const Customer = () => {
  const { customerList, setCustomerList } = useContext(EntityDetailsContext);
  const [currentPage, setCurrentPage] = useState(1);
  // const callAPI = (url, data) => {};
  useEffect(() => {
    const url = `http://localhost:8080/v1/customer/customerList?page=${currentPage}`;
    const data = {
      sort_key: "name",
      sort_value: "ASC",
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => setCustomerList(json.customer));
  }, [currentPage, setCustomerList]);

  return (
    <div>
      {customerList.length > 0 ? (
        <div className="table-form">
          <div class="customers-addcustomer ">
            <h1 data-testid="custom-element">Customers</h1>

            <Link to="/customer/add" className="add-button">
              <i class="fa fa-plus"></i>
              Add Customer
            </Link>
          </div>
          <Table
            column={CUSTOMER_COLUMN}
            datalist={customerList}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      ) : (
        <div className="empty-invoice-list">
          <div className="empty-box">
            <div className="empty-box-text" data-testid="custom-element">
              NO Customers
            </div>
            <Link to="/customer/add" className="add-button">
              <i className="fa fa-plus"></i>
              Add Customer
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Customer;
