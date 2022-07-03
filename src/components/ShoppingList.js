import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterField, setFilterField] = useState("");
  const [itemList, setItemList] = useState(items);

  
  function updateFilterField(e) {
    setFilterField(e.target.value);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function onItemFormSubmit(newItem) {
    const newItemList = [...itemList, newItem];
    setItemList(newItemList);
  }
  

  const itemsToDisplay = itemList.filter((item) => {
    if (selectedCategory === "All" && filterField === "") return true;
    if (filterField !== "" && selectedCategory !== "All"){
      return item.name.includes(filterField) && item.category === selectedCategory;
    }
    if (filterField !== "" && selectedCategory === "All"){
      return item.name.includes(filterField) ;
    }
    return  item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit}/>
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={updateFilterField} search={filterField}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
