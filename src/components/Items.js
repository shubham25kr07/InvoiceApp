import { useContext } from "react";
import { ITEM_COLUMN } from "../Utils/Constants";
import Table from "../Utils/Table";
import { EntityDetailsContext } from "../App";
import { Link } from "react-router-dom";

const Item = () => {
  const { itemList } = useContext(EntityDetailsContext);
  const pagination = false;

  return (
    <div>
      {itemList.length > 0 ? (
        <div className="table-form">
          <div class="customers-addcustomer">
            <h1>Items</h1>
            <Link to="/item/add" className="add-button">
              <i class="fa fa-plus"></i>
              Add Item
            </Link>
          </div>
          <Table
            column={ITEM_COLUMN}
            datalist={itemList}
            pagination={pagination}
          />
        </div>
      ) : (
        <div className="empty-invoice-list">
          <div className="empty-box">
            <div className="empty-box-text">NO Items</div>
            <Link to="/item/add" className="add-button">
              <i class="fa fa-plus"></i>
              Add Item
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
