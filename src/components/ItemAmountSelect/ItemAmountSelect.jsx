import "../ItemAmountSelect/_ItemAmountSelect.css";

function ItemAmountSelect({ amount, onIncrease, onDecrease }) {
  return (
    <div className="item-amount-select__container">
      <button onClick={onDecrease} className="item-amount-select__decrease">
        -
      </button>
      <p className="item-amount-select__amount">{amount}</p>
      <button onClick={onIncrease} className="item-amount-select__increase">
        +
      </button>
    </div>
  );
}

export default ItemAmountSelect;
