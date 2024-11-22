export const calculateAveragePrices = (items) => {
  const courseMap = {};
  items.forEach((item) => {
    if (!courseMap[item.category]) {
      courseMap[item.category] = { total: 0, count: 0 };
    }
    courseMap[item.category].total += item.price;
    courseMap[item.category].count += 1;
  });

  return Object.keys(courseMap).map((course) => ({
    course,
    avgPrice: (courseMap[course].total / courseMap[course].count).toFixed(2),
  }));
};
