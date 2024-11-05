import React, { useState } from "react";

const Keyword = () => {
  const [keywords, setKeywords] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (!keywords.includes(inputValue.trim())) {
        setKeywords([...keywords, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  return (
    <div className="input input-bordered keyword-input-container rounded-2xl flex p-2 border border-gray-300 items-center">
      <div className="keywords-list mt-2 flex flex-wrap">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="keyword-item  bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 flex items-center"
          >
            {keyword}
            <button
              onClick={() => removeKeyword(index)}
              className="ml-1 text-red-500 hover:text-red-700 text-xl"
              aria-label="Remove keyword"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Add a keyword"
        className="rounded-md px-2 py-1"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Keyword input"
      />
    </div>
  );
};

export default Keyword;
