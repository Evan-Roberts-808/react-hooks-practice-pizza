import React, { useState, useEffect } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {

const [ pizzas, setPizzas ] = useState([])
const [ pizzaForm, setPizzaForm ] = useState({
  'topping': "",
  'size': "small",
  'vegetarian': false
})

useEffect(() => {
  fetch('http://localhost:3001/pizzas')
  .then((response) => response.json())
  .then((pizzas) => {
    setPizzas(pizzas)
  })
}, [])

function handlePizzaEdit(updatedPizzaForm){
  setPizzaForm(updatedPizzaForm)
}

function handleFormChange(event) {
  const target = event.target
  const value= target.type === 'checkbox' ? target.checked : target.value
  const name = target.name

  setPizzaForm({
    ...pizzaForm,
    [name]: value
  })
}

function handleSubmit(event) {
  event.preventDefault()
  const pizzaId = pizzaForm.id
  fetch(`http://localhost:3001/pizzas/${pizzaId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizzaForm),
    })
      .then((response) => response.json())
      .then((updatedPizza) => {
        const updatedPizzas = pizzas.map((pizza) => {
          if (pizza.id === updatedPizza.id) {
            return updatedPizza;
          } else {
            return pizza;
          }
        });
        setPizzas(updatedPizzas);
        setPizzaForm({
          topping: "",
          size: "Small",
          vegetarian: false,
        });
      })
  }


  return (
    <>
      <Header />
      <PizzaForm editPizza={pizzaForm} handleFormChange={handleFormChange} handleSubmit={handleSubmit}/>
      <PizzaList pizzas={pizzas} onEdit={handlePizzaEdit}/>
    </>
  );
}

export default App;
