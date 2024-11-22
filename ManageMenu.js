import React, { useState } from "react";

const predefinedCourses = ["Starter", "Main", "Dessert"];

const ManageMenu = ({ updateMenu, menuItems: initialItems }) => {
  const [menuItems, setMenuItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({ title: "", category: predefinedCourses[0], price: "", desc: "" });
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleAddItem = () => {
    const updatedMenu = [...menuItems, { id: Date.now(), ...newItem }];
    setMenuItems(updatedMenu);
    updateMenu(updatedMenu);
    setNewItem({ title: "", category: predefinedCourses[0], price: "", desc: "" });
  };

  const handleRemoveItem = (id) => {
    const updatedMenu = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedMenu);
    updateMenu(updatedMenu);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <section className="manage-menu section">
      <h2>Manage Menu</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        >
          {predefinedCourses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
        />
        <textarea
          placeholder="Description"
          value={newItem.desc}
          onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
        ></textarea>
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <div className="category-filter">
        <label htmlFor="category">Filter by Category: </label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="all">All</option>
          {predefinedCourses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {menuItems
          .filter(item => selectedCategory === "all" || item.category === selectedCategory)
          .map((item) => (
            <li key={item.id}>
              {item.title} - {item.category} (${item.price})
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default ManageMenu;
