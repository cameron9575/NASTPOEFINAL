import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Categories from "../components/Categories";
import { calculateAveragePrices } from "../utils/utils"; // Adjust the path based on your project structure
import { predefinedCourses } from "../styles/data";

const Home = ({ updateMenu, menuItems: initialItems }) => {
  const [menuItems, setMenuItems] = useState(initialItems);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories] = useState(["all", ...new Set(initialItems.map((item) => item.category))]);
  const [newItem, setNewItem] = useState({
    title: "",
    category: predefinedCourses[0],
    price: "",
    desc: "",
  });
  const [averagePrices, setAveragePrices] = useState(calculateAveragePrices(initialItems));

  const filterItems = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setMenuItems(initialItems);
    } else {
      const newItems = initialItems.filter((item) => item.category === category);
      setMenuItems(newItems);
    }
  };

  const handleAddItem = () => {
    const updatedMenu = [...menuItems, { id: Date.now(), ...newItem }];
    setMenuItems(updatedMenu);
    updateMenu(updatedMenu);
    setNewItem({ title: "", category: predefinedCourses[0], price: "", desc: "" });
  };

  // Recalculate average prices whenever menuItems changes
  useEffect(() => {
    setAveragePrices(calculateAveragePrices(menuItems));
  }, [menuItems]);

  const totalItems = menuItems.length;

  const styles = {
    title: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    totalItems: {
      fontSize: '1.25rem',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    averagePrice: {
      textAlign: 'center',
      fontSize: '1rem',
      color: 'hsl(209, 61%, 16%)',
    },
  };

  return (
    <section className="menu section">
      <div style={styles.title}>
        <h2>Chef's Menu List</h2>
        <div className="underline"></div>
      </div>
      <p style={styles.totalItems}>Total Items: {totalItems}</p>
      <div>
        {averagePrices.map(({ course, avgPrice }) => (
          <p key={course} style={styles.averagePrice}>
            Average price for {course}: ${avgPrice}
          </p>
        ))}
      </div>
      <div className="form">
        <h3>Add Menu Item</h3>
        <input
          type="text"
          placeholder="Dish Name"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newItem.desc}
          onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
        ></textarea>
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
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <Categories
        categories={categories}
        activeCategory={activeCategory}
        filterItems={filterItems}
      />
      <Menu items={menuItems} />
    </section>
  );
};

export default Home;
