const ItemCard = ({ Name, Quantity, Amount, className }) => {
  return (
    <div className={"item-card-field"}>
      <div className="item-card-name">{Name}</div>
      <div className="item-card-field-quantity-price">
        <div className="item-card-quantity">
          {Quantity ? `x ${Quantity}` : ""}
        </div>
        <div className={className || "total-amount-default"}>{Amount}</div>
      </div>
    </div>
  );
};
export default ItemCard;
