import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';


const Buy = () => {
  const [movie, setMovie] = useState([]);
  const [session, setSession] = useState([]);
  const { moviesId } = useParams();

  useEffect(() => {
    const getSessions = async() => {
      const res = await axios.get(`https://cinema-api-test.herokuapp.com/movieShows?movie_id=${moviesId}`);

      setSession(res.data);
    };

    const getMovie = async() => {
      const res = await axios.get(`https://cinema-api-test.herokuapp.com/movies?movie_id=${moviesId}`);

      setMovie(res.data);
    };

    getSessions();
    getMovie();
  }, []);

  return (
    <>
    <Header />
    <main>
      <div>
      {session.places.map( (row, i) => (
        <div>
        <div>{i+1}</div>
        <div>{row.map( place => (
         <div>{place.position}</div>
        ))}</div>
       </div>
      ))}
    </div>
    </main>
  </>
  );
};

export default Buy;
