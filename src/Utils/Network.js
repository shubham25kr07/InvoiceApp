const CustomerApi = (setCustomerList) => {
  const url = `http://localhost:8080/v1/customer/customerList?page=1`;
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
};
const ItemApi = (setItemList) => {
  const url = `http://localhost:8080/v1/item/itemList?page=1`;
  const data = {
    sort_key: "item_name",
    sort_value: "ASC",
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      setItemList(json.item);
    })
    .catch((error) => console.table(error));
};
const InvoiceApi = (setInvoiceList) => {
  const url = "http://localhost:8080/v1/invoice/list";

  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setInvoiceList(json);
    });
};

export { CustomerApi, ItemApi, InvoiceApi };
