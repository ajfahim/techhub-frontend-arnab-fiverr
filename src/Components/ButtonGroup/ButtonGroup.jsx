import { useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";

function ButtonGroup({ labels, onSearch }) {
  const initialInputs = labels.reduce((acc, label) => ({ ...acc, [label]: "" }), {});
  
  const [inputs, setInputs] = useState(initialInputs);

  const handleInputChange = (label, value) => {
    setInputs((prev) => ({ ...prev, [label]: value }));
  };

  const handleSearchClick = () => {
    onSearch(inputs); // Pass the inputs directly to the onSearch function
  };

  const handleRefreshClick = () => {
    setInputs(initialInputs); // Reset inputs to initial empty state
    onSearch(initialInputs); // Trigger the search with empty inputs
  };

  return (
    <div className="flex flex-col lg:flex-row space-y-1 space-x-2 mt-4 bg-primary-color p-7 bg-opacity-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
        {Object.keys(inputs).map((label) => (
          <div
            key={label}
            className="flex text-center bg-white text-black items-center justify-evenly border rounded-full px-2 py-1 hover:border-primary-color"
          >
            {label === "Salary" ? (
              <select
                className="bg-transparent focus:outline-none w-full"
                value={inputs[label]}
                onChange={(e) => handleInputChange(label, e.target.value)}
              >
                <option value="">Sort by Salary</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            ) : (
              <input
                type="text"
                placeholder={label}
                className="bg-transparent focus:outline-none"
                value={inputs[label]}
                onChange={(e) => handleInputChange(label, e.target.value)}
              />
            )}
            {/* <IoIosArrowDown className="text-primary-color hover:text-hover-color" /> */}
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button
          className="ml-4 bg-primary-color hover:bg-hover-color text-white px-4 py-2 rounded-full"
          onClick={handleRefreshClick}
        >
          <HiOutlineRefresh />
        </button>
        <button
          className="ml-4 bg-primary-color hover:bg-hover-color text-white px-4 py-2 rounded-full"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default ButtonGroup;
