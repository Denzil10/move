import React from "react";

interface HistoryItem {
  id: string;
  date: string;
  calories: number;
  duration: number;
}

interface HistoryListProps {
  history: HistoryItem[];
}

const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  if (history.length === 0) return null;

  const exportToCSV = () => {
    const headers = ["Date", "Duration (s)", "Calories"];
    const rows = history.map(item => [
      item.date,
      Math.round(item.duration).toString(),
      item.calories.toString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `move-pet-history-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="history-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4>Recent Activity</h4>
        <button 
          onClick={exportToCSV}
          style={{ fontSize: "0.7rem", padding: "2px 8px", cursor: "pointer" }}
        >
          📥 CSV
        </button>
      </div>
      <ul className="history-list">
        {history.map(item => (
          <li key={item.id}>
            {item.date}: {Math.round(item.duration)}s ({item.calories} cal)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
