import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  // initialize projects state
  const [projects, setProjects] = useState([]);

  // after rendering, make the api call
  useEffect( () => {
    api.get('repositories').then( response => {
      setProjects(response.data);
    })
  }, [])


  async function handleAddRepository() {
    // store the api post response
    const response = await api.post('/repositories', {
      title: "Prelúdio em Dó maior, Op. 29"
    })

    // get data object from response
    const project = response.data;

    // change the state
    setProjects([...projects, project]);

  }

  async function handleRemoveRepository(id) {

    // store project index in array
    const projectIndex = projects.findIndex( project => project.id === id);

    // TODO
    const response = await api.delete(`/repositories/${id}`);

    // create a new state
    setProjects(projects.filter( project => project.id !== id));

    // if api delete is successful, insert the new state   
    /* if ( response.status === 204 ) {
      setProjects(updatedProjects);     
    } */
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { projects.map( project => (
          <li key={project.id}>
            <h3>{project.title}</h3>
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ) )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
