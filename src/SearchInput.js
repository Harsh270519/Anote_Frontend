import React, { useState } from 'react';

function SearchInput({ onSearch, onReset, roles, programmingLanguages, majors }) {
  const [input, setInput] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedFilterValue, setSelectedFilterValue] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setSelectedFilterValue('');
  };

  const handleFilterValueChange = (event) => {
    setSelectedFilterValue(event.target.value);
  };

  const handleSubmit = () => {
    onSearch(input, selectedRole, selectedFilter, selectedFilterValue);
  };

  const handleReset = () => {
    setInput('');
    setSelectedRole('');
    setSelectedFilter('');
    setSelectedFilterValue('');
    onReset();
  };

  const filterOptions = {
    programming_language: programmingLanguages,
    gpa: ['below 3', '3 - 3.5', 'above 3.5'],
    major: majors
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter name"
      />
      <select value={selectedRole} onChange={handleRoleChange}>
        <option value="">All Roles</option>
        {roles.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
      <select value={selectedFilter} onChange={handleFilterChange}>
        <option value="">Filter By</option>
        <option value="programming_language">Programming Language</option>
        <option value="gpa">GPA</option>
        <option value="major">Major</option>
      </select>
      {selectedFilter && (
        <select value={selectedFilterValue} onChange={handleFilterValueChange}>
          <option value="">Select {selectedFilter.replace('_', ' ')}</option>
          {filterOptions[selectedFilter].map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}
      <button data-testid="search-button" onClick={handleSubmit}>Search</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default SearchInput;
