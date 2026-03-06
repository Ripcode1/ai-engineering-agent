import { useState, useEffect } from "react";

interface Item {
  id: number;
  name: string;
  created_at: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const modalUrl = import.meta.env.VITE_MODAL_URL;

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(`${modalUrl}/items`);
      const data = await response.json();
      setItems(data.items);
    } catch (error) {
      showToast("Failed to fetch items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    if (!newItem.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${modalUrl}/items/${encodeURIComponent(newItem)}`,
        { method: "POST" }
      );

      if (!response.ok) throw new Error("Failed to add item");

      showToast("Item added successfully");
      setNewItem("");
      fetchItems();
    } catch (error) {
      showToast("Failed to add item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Item Manager</h1>
          <p className="text-sm text-gray-500 mt-1">
            Add and view items in the database
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {/* Add Item Form */}
          <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
            <input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter item name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Adding..." : "Add Item"}
            </button>
          </form>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-500">
                    ID
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">
                    Name
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center py-8 text-gray-400"
                    >
                      No items yet. Add one above!
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-2 text-gray-600">{item.id}</td>
                      <td className="py-3 px-2 text-gray-900">{item.name}</td>
                      <td className="py-3 px-2 text-gray-600">
                        {new Date(item.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 text-center mt-3">
              A list of all items in the database
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
