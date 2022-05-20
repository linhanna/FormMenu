import { useState } from "react";
import { toppings } from "./toppings";
import "./styles.css";

const getFormattedPrice = (price) => `$${price.toFixed(0)}`;

export default function FormMenu() {
    const [money, setMoney] = useState(0);
    const [checkedState, setCheckedState] = useState(
        new Array(toppings.length).fill(false)
    );

    const [total, setTotal] = useState(0);

    const inputMoney = (e) =>{
        setMoney(e.target.value)
    }

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

    setCheckedState(updatedCheckedState);
    

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + toppings[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  return (
    <div className="App">
      
        <center><h4> Nhập số tiền khách hàng có:<input type="number" name ="money" onChange={inputMoney}/> </h4></center>
        
      <h3>Menu</h3>
      <ul className="toppings-list">
        {toppings.map(({ name, price }, index) => {
          return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
                <div className="right-section">{getFormattedPrice(price)}</div>
              </div>
            </li>
          );
        })}
        <li>
          <div className="toppings-list-item">
            <div className="left-section">Tổng tiền:</div>
            <div className="right-section">{getFormattedPrice(total)}</div>
          </div>
        </li>
        <h3>Số tiền khách đã đưa: {`$`+ parseInt(money)}</h3>
        <h3>Tổng số tiền khách đã mua: {`$`+ parseInt(total)}</h3>
        <h3>tiền thừa của khách: {`$`}{parseInt(money) - parseInt(total)}</h3>
        {/* <h1 ></h1> */}
      </ul>
      
    </div>
  );
}