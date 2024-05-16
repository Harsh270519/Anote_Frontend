

import React, { useState, useEffect } from 'react';
import './App.css';
import SearchInput from './SearchInput';
import CandidateList from './CandidateList';

function App() {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedFilterValue, setSelectedFilterValue] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [visibleCandidates, setVisibleCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCandidates(data);
      setFilteredCandidates(data);
      setVisibleCandidates(data.slice(0, itemsPerPage));
    } catch (error) {
      setError('Failed to fetch candidate data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (criteria, role, filter, filterValue) => {
    setSearchCriteria(criteria);
    setSelectedRole(role);
    setSelectedFilter(filter);
    setSelectedFilterValue(filterValue);

    let filteredData = candidates;

    if (role) {
      filteredData = filteredData.filter(candidate => candidate.role === role);
    }

    if (criteria) {
      filteredData = filteredData.filter(candidate =>
        `${candidate.first_name} ${candidate.last_name}`.toLowerCase().includes(criteria.toLowerCase())
      );
    }

    if (filter && filterValue) {
      if (filter === 'programming_language') {
        filteredData = filteredData.filter(candidate => candidate.programming_languages.includes(filterValue));
      } else if (filter === 'gpa') {
        if (filterValue === 'below 3') {
          filteredData = filteredData.filter(candidate => candidate.gpa < 3);
        } else if (filterValue === '3 - 3.5') {
          filteredData = filteredData.filter(candidate => candidate.gpa >= 3 && candidate.gpa <= 3.5);
        } else if (filterValue === 'above 3.5') {
          filteredData = filteredData.filter(candidate => candidate.gpa > 3.5);
        }
      } else if (filter === 'major') {
        filteredData = filteredData.filter(candidate => candidate.major === filterValue);
      }
    }

    setFilteredCandidates(filteredData);
    setVisibleCandidates(filteredData.slice(0, itemsPerPage));
    setHasMore(filteredData.length > itemsPerPage);
    setPage(1);
  };

  const handleReset = () => {
    setSearchCriteria('');
    setSelectedRole('');
    setSelectedFilter('');
    setSelectedFilterValue('');
    setFilteredCandidates(candidates);
    setVisibleCandidates(candidates.slice(0, itemsPerPage));
    setHasMore(candidates.length > itemsPerPage);
    setPage(1);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const roles = [...new Set(candidates.map(candidate => candidate.role))];
  const programmingLanguages = [...new Set(candidates.flatMap(candidate => candidate.programming_languages))];
  const majors = [...new Set(candidates.map(candidate => candidate.major))];

  const loadMore = () => {
    setTimeout(() => {
      const newPage = page + 1;
      const newVisibleCandidates = filteredCandidates.slice(0, newPage * itemsPerPage);
      setVisibleCandidates(newVisibleCandidates);
      setPage(newPage);
      setHasMore(newVisibleCandidates.length < filteredCandidates.length);
    }, 1500); 
  };

  return (
    <div className="App">
      <header>
        <h1>Cornell Tech Intern Search App</h1>
      </header>
      <div className="search-container">
        <SearchInput 
          onSearch={handleSearch} 
          onReset={handleReset} 
          roles={roles} 
          programmingLanguages={programmingLanguages}
          majors={majors}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <CandidateList candidates={visibleCandidates} loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
}

export default App;


