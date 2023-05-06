import React from "react";

function Pizza({ pizza, onEdit }) {

  function handleEdit(e) {
    const editPizza = {
      'id': pizza.id,
      'topping': pizza.topping,
      'size': pizza.size,
      'vegetarian': pizza.vegetarian
    }
    // console.log(editPizza)
    onEdit(editPizza)
  }

  return (
    <tr>
      <td>{pizza.topping}</td>
      <td>{pizza.size}</td>
      <td>{pizza.vegetarian ? "Yes" : "No"}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={handleEdit}>
          Edit Pizza
        </button>
      </td>
    </tr>
  );
}

export default Pizza;
