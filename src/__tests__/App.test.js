
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import App from '../App';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});
// Name test
describe('Cornell Tech Intern Search App Tests', () => {
  
  
  test('filters by name', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([
      {
        id: 1,
        first_name: 'Melissa',
        last_name: 'Tan',
        email: 'mrt96@cornell.edu',
        linkedin: 'https://www.linkedin.com/in/melissa-tan-rui-lin/',
        role: 'SDE',
        programming_languages: ['Python', 'JavaScript'],
        gpa: 3.8,
        major: 'Computer Science'
      }
    ]));
    
    render(<App />);
    
    const input = await screen.findByPlaceholderText(/enter name/i);
    fireEvent.change(input, { target: { value: 'Melissa' } });
    fireEvent.click(screen.getByTestId('search-button'));
    
    const candidates = await screen.findAllByText(/melissa tan/i);
    expect(candidates.length).toBeGreaterThan(0);
  });

  // API Call Test
  test('fetches and displays data from API', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([
      {
        id: 1,
        first_name: 'Test',
        last_name: 'User',
        email: 'test@cornell.edu',
        linkedin: 'https://www.linkedin.com/in/test-user/',
        role: 'SDE',
        programming_languages: ['Python', 'JavaScript'],
        gpa: 3.8,
        major: 'Computer Science'
      }
    ]));
    
    render(<App />);
    
    await waitFor(() => expect(screen.getByText(/test user/i)).toBeInTheDocument());
  });
});
