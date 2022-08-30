import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    INVOICE_ITEMS_COLUMN,
    INVOICE_ITEM_MODAL_HEADER,
    INVOICE_CUSTOMER_MODAL_HEADER,
} from '../Utils/Constants';
import { EntityDetailsContext } from '../App';
import PopUp from '../Utils/PopUp';
import Label from '../Utils/Label';
import Input from '../Utils/Input';

import TableHeader from '../Utils/TableHeader';
import TableRow from '../Utils/TableRow';

import ItemCard from '../Utils/ItemCard';
import TextArea from '../Utils/TextArea';
import SelectList from '../Utils/SelectList';
import PopUpTitle from '../Utils/PopUpTitle';
import TableCell from '../Utils/TableCell';

const InvoiceForm = () => {
    const { setInvoiceList } = useContext(EntityDetailsContext);
    const { itemList } = useContext(EntityDetailsContext);
    const { customerList } = useContext(EntityDetailsContext);
    const [displayItemModal, setDisplayItemModal] = useState(false);
    const [displayCustomerModal, setdisplayCustomerModal] = useState(false);
    const [selectedItemList, setSelectedItemList] = useState([]);
    const [selectedCustomerList, setSelectedCustomerList] = useState(null);
    const [itemListToshow, setItemListToShow] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setItemListToShow(itemList);
    }, [itemList]);

    const showItemModal = () => {
        setDisplayItemModal(!displayItemModal);
    };

    const showCustomerModal = (e) => {
        setdisplayCustomerModal(!displayCustomerModal);
    };

    const deleteItem = (index) => {
        console.log('hello');
        const result = selectedItemList.filter((_, ind) => ind !== index);
        const resultToShow = selectedItemList.filter((_, ind) => ind === index);

        console.log(resultToShow);
        setSelectedItemList(result);
        setItemListToShow((prev) => [...prev, ...resultToShow]);
    };

    const [inputValue, setInputValue] = useState({
        IssuedAt: new Date().toISOString().slice(0, 10),
        DueDate: '',
        Notes: '',
        InvoiceNumber: '',
        ReferenceNumber: '',
        CustomerId: 0,
    });
    const { IssuedAt, DueDate, Notes, ReferenceNumber, InvoiceNumber } =
    inputValue;

    const saveInvoice = (e) => {
        e.preventDefault();
        console.log(selectedItemList);
        const itemIdList = selectedItemList.map((value, index) => value.ItemId);
        const quantityList = selectedItemList.map((value, index) => value.quantity);
        const priceList = selectedItemList.map((value, index) => value.Price);
        const requestBodyJson = {
            ItemList: itemIdList,
            QuantityList: quantityList,
            PriceList: priceList,
            PaidStatus: 'Pending',
            ...inputValue,
        };

        const url = 'http://localhost:8080/v1/invoice/create';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestBodyJson),
        })
            .then(async (response) => {
                const x = await response.json();
                console.log(x, response);

                if (response.status !== 200) {
                    throw new Error(x.message);
                } else {
                    return x;
                }
            })
            .then((json) => {
                console.log(json);
                const responseInvoice = {
                    InvoiceId: json.InvoiceId,
                    CreatedAt: json.CreatedAt,
                    CustomerName: json.CustomerName,
                    ReferenceNumber: json.ReferenceNumber,
                    PaidStatus: json.PaidStatus,
                    TotalAmount: json.TotalAmount,
                };
                setInvoiceList((prev) => {
                    console.log(prev);
                    return [...prev, responseInvoice];
                });
                alert('Invoice Added Successfully');
                navigate('/invoice');
            })
            .catch((error) => {
                console.table(error);
            });
    };
    const validateDate = () => {};
    const setModalItemList = (val) => {
        const modifiedItemListToShow = itemListToshow.filter(
            (_, index) => !val.includes(index)
        );
        setItemListToShow(modifiedItemListToShow);
        const selectedlist = itemListToshow.filter((_, index) =>
            val.includes(index)
        );
        const selectedlistquan = selectedlist.map((list, index) => {
            return { ...list, quantity: 1 };
        });

        setSelectedItemList((prev) => {
            return [...prev, ...selectedlistquan];
        });
        showItemModal();
    };

    const setModalCustomerList = (val) => {
        const selectedlist = customerList[val[0]];
        setInputValue((prev) => ({
            ...prev,
            CustomerId: selectedlist.id,
        }));
        setSelectedCustomerList(selectedlist);

        showCustomerModal();
    };
    const handleChange = (type, e) => {
        const { value } = e.target;

        setInputValue((prev) => ({
            ...prev,
            [type]: value,
        }));
    };
    const handleChangeQuantity = (e, index) => {
        var result = [...selectedItemList];
        result = result.map((x, y) => {
            if (y === index) {
                x.quantity = Number(e.target.value);
                return x;
            } else return x;
        });
        setSelectedItemList(result);
    };
    const calculateTotalAmount = () => {
        var result = [...selectedItemList];
        let amount = 0;
        result.forEach((data) => {
            amount = amount + data.quantity * data.Price;
        });
        return amount;
    // setTotalAmount(amount);
    };
    return (
        <div className="form-container">
            <div className="form-top-header">
                <h1>New Invoice</h1>
                <button className="add-button" onClick={saveInvoice}>
                    <i className="fa fa-file"></i>Save Invoice
                </button>
            </div>
            <form>
                <div className="form-first-div">
                    <div className="div-f1">
                        <div className="invoice-bill-to">Bill To</div>

                        <div className="invoice-customer-details-button">
                            <div className="">
                                {selectedCustomerList ? (
                                    <div>
                                        <div>{selectedCustomerList.name}</div>
                                        <div>{selectedCustomerList.phone_number}</div>
                                        <div>{selectedCustomerList.email}</div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>

                            <button
                                className="invoice-bill-to-button"
                                type="button"
                                onClick={showCustomerModal}
                            >
                Change
                            </button>
                        </div>
                    </div>
                    <div className="div-f2">
                        <div className="div-dates">
                            <div>
                                <Label label="Issued At" />
                                <div className="div-i-input">
                                    <i class="fa fa-calendar" aria-hidden="true"></i>
                                    <Input
                                        type="date"
                                        className="input-dates"
                                        value={IssuedAt}
                                        placeholder="Issued At"
                                        name="IssuedAt"
                                        onChange={handleChange.bind(null, 'IssuedAt')}
                                        onBlur={validateDate.bind(null, 'IssuedAt')} //change the name of handleBlur
                                        isDisabled={true}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label label="Due Date" />
                                <div className="div-i-input">
                                    {/* <i class="fa fa-calendar" aria-hidden="true"></i> */}
                                    <Input
                                        type="date"
                                        className="input-dates"
                                        value={DueDate}
                                        placeholder="Due Date"
                                        name="DueDate"
                                        id="dueDate"
                                        onChange={handleChange.bind(null, 'DueDate')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="div-numbers">
                            <div>
                                <Label label="Invoice Number" />
                                <div className="div-i-input">
                                    <i class="fa fa-hashtag" aria-hidden="true"></i>
                                    <Input
                                        type="text"
                                        value={InvoiceNumber}
                                        className="input-dates"
                                        placeholder="InvoiceNumber"
                                        name="InvoiceNumber"
                                        onChange={handleChange.bind(null, 'IssuedAt')}
                                        onBlur={validateDate.bind(null, 'IssuedAt')} //change the name of handleBlur
                                        isDisabled={true}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label label="Ref Number" />
                                <div className="div-i-input">
                                    <i class="fa fa-hashtag" aria-hidden="true"></i>
                                    <Input
                                        type="text"
                                        value={ReferenceNumber}
                                        placeholder="ReferenceNumber"
                                        className="input-dates"
                                        label="Ref Number"
                                        name="ReferenceNumber"
                                        onChange={handleChange.bind(null, 'ReferenceNumber')}
                                        onBlur={validateDate.bind(null, 'ReferenceNumber')} //change the name of handleBlur
                                        isDisabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-second-div">
                    <div className="table-header">
                        <TableHeader columns={INVOICE_ITEMS_COLUMN} />
                    </div>
                    <div className="table-row">
                        {selectedItemList &&
              selectedItemList.map((data, index) => {
                  return (
                      <div className="table-row-item" key={index}>
                          <TableRow>
                              <TableCell data={data.Item_Name} />
                              <div className="table-cell">
                                  <Input
                                      type="text"
                                      className="table-row-input"
                                      value={data.quantity}
                                      name={index}
                                      onChange={(e) => handleChangeQuantity(e, index)}
                                  />
                              </div>
                              <TableCell data={data.Price} />
                              <TableCell data={data.Price * data.quantity} />
                              <div className="delete-button-table-cell">
                                  <div>
                                      <button
                                          className="delete-button"
                                          type="button"
                                          onClick={(e) => deleteItem(index)}
                                      >
                                          <i class="fa fa-trash fa-2x" aria-hidden="true"></i>
                                      </button>
                                  </div>
                              </div>
                          </TableRow>
                      </div>
                  );
              })}
                    </div>
                    <div className="table-button">
                        <button
                            className="add-item-button"
                            type="button"
                            onClick={showItemModal}
                        >
                            <i class="fa fa-shopping-basket"></i>
              Add an Item
                        </button>
                    </div>
                </div>
                <div></div>

                <div></div>
                <div className="form-third-div">
                    <div>
                        <Label label="Notes" />
                        <div>
                            <TextArea
                                id="Notes"
                                type="text"
                                className="notes"
                                value={Notes}
                                name="Notes"
                                onChange={handleChange.bind(null, 'Notes')}
                            />
                        </div>
                    </div>
                    <div className="form-third-div-f2">
                        <div className="form-item-cards">
                            {selectedItemList &&
                selectedItemList.map((data, index) => {
                    return (
                        <>
                            <ItemCard
                                Name={data.Item_Name}
                                Quantity={data.quantity}
                                Amount={data.quantity * data.Price}
                            />
                        </>
                    );
                })}
                        </div>
                        <hr className="hr-line" />
                        <ItemCard
                            Name={'TOTAL AMOUNT:'}
                            Amount={calculateTotalAmount()}
                            className={'total-amount'}
                            classNameField={'total-amount-field'}
                        />
                    </div>
                </div>
            </form>

            <PopUp displayModel={displayItemModal} showModel={showItemModal}>
                <PopUpTitle title="Add Item" />
                <SelectList
                    dataList={itemListToshow}
                    setList={setModalItemList}
                    optionValue={INVOICE_ITEM_MODAL_HEADER}
                />
            </PopUp>

            <PopUp displayModel={displayCustomerModal} showModel={showCustomerModal}>
                <PopUpTitle title="Add Customer" />
                <SelectList
                    dataList={customerList}
                    setList={setModalCustomerList}
                    optionValue={INVOICE_CUSTOMER_MODAL_HEADER}
                />
            </PopUp>
        </div>
    );
};
export default InvoiceForm;
