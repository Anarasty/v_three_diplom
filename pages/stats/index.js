// export default StatsPage;
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import app from "../../shared/FirebaseConfig";

const COLORS = ["#00C49F", "#FF8042"]; // found - зелёный, lost - оранжевый

function StatsPage() {
  const db = getFirestore(app);
  const [categoryData, setCategoryData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const items = querySnapshot.docs.map((doc) => doc.data());

    // Category
    const categoryCounts = {
      Documents: 0,
      Keys: 0,
      Tech: 0,
      Wallets: 0,
      Clothes: 0,
      Bags: 0,
      Other: 0,
    };

    // Status
    const statusCounts = {
      found: 0,
      lost: 0,
    };

    items.forEach((item) => {
      const category = item.itemCategory;
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category] += 1;
      } else {
        categoryCounts.Other += 1;
      }

      const status = item.status;
      if (statusCounts.hasOwnProperty(status)) {
        statusCounts[status] += 1;
      }
    });

    const chartData = Object.entries(categoryCounts).map(([key, value]) => ({
      category: key,
      count: value,
    }));

    const pieChartData = Object.entries(statusCounts).map(([key, value]) => ({
      name: key === "found" ? "Found" : "Lost",
      value,
    }));

    setCategoryData(chartData);
    setStatusData(pieChartData);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold my-5">General statistics by item category</h1>
      {categoryData.length === 0 ? (
        <p>No data to display. Please add at least one item.</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Items count" />
            </BarChart>
          </ResponsiveContainer>

          <h2 className="text-xl font-semibold mt-10 mb-4 pt-5">
          General statistics on found and lost items
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default StatsPage;