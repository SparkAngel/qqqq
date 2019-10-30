import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

class Home extends Component {

  state = {
    sesmovies: [],
    allMov: [],
    qq: [],
  }

  componentDidMount() {
    const qqq = () => {
      Promise.all([
        fetch('https://cinema-api-test.herokuapp.com/movies'),
        fetch('https://cinema-api-test.herokuapp.com/movieShows'),
      ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => this.setState({
          allMov: data1,
          sesmovies: data2,
        },
        () => this.filter()));

    }

    qqq();
}

 filter = () => {
    console.log(this.state.sesmovies);
    console.log(this.state.allMov);

    let sessionsMov = this.state.sesmovies;
    let allMovs = this.state.allMov;
    let qq = this.state.qq;
    let qqq= [];
    let time = [];
    console.log(sessionsMov[0].movie_id);

    for (let  i in sessionsMov) {

      for(let j in allMovs){

        if( sessionsMov[i].movie_id == allMovs[j]._id ){
          let time = sessionsMov[i].startTime.slice(11,-8)
         qqq.push(Object.assign(sessionsMov[i],allMovs[j],{truetime:time}))
          console.log(qqq);
        }
      }
    }
    return this.setState({qq: qqq})

  }

  render() {
    const { sesmovies, allMov, qq } = this.state;
  return (
  <>
    <Header />
    <main>
      <div>
          <div>
          {qq.map( sortmov => (
            <div key={sortmov._id}>
                <img src={sortmov.pictureLink} alt="logo" />
                <div>{sortmov.name}</div>
                <div>{sortmov.ticketPrice}</div>
                <div>{sortmov.truetime}</div>
                <Link
                to={`/buy/${sortmov._id}`}
              >
                <button>КУПИТЬ БИЛЕТ</button>
              </Link>
                <Link
                to={`/movies/${sortmov._id}`}
              >
                <button>О ФИЛЬМЕ</button>
              </Link>
            </div>
          ))}

          </div>
      </div>
    </main>
  </>
);
}
}

export default Home;
