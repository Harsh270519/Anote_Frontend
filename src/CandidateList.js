
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function CandidateList({ candidates, loadMore, hasMore }) {
  return (
    <InfiniteScroll
      dataLength={candidates.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
    >
      <div className="candidate-list">
        {candidates.length > 0 ? (
          candidates.map(candidate => (
            <li key={candidate.id} className="candidate-card">
              <h2>{candidate.first_name} {candidate.last_name}</h2>
              <p><span className="label">Email:</span> <a href={`mailto:${candidate.email}`}>{candidate.email}</a></p>
              <p><span className="label">Role:</span> {candidate.role}</p>
              <p><span className="label">Programming Languages:</span> {candidate.programming_languages.join(', ')}</p>
              <p><span className="label">GPA:</span> {candidate.gpa}</p>
              <p><span className="label">Major:</span> {candidate.major}</p>
              <p><span className="label">LinkedIn:</span> <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer">Profile</a></p>
            </li>
          ))
        ) : (
          <p>No candidates found</p>
        )}
      </div>
    </InfiniteScroll>
  );
}

export default CandidateList;



