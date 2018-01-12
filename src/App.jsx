import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '', // my query
      artist: null, // my response
      tracks: []
    }
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    var accessToken = 'BQBLpU46IrYNaA2Hoga-r5TY9_wnk0FjgDnwRD7D7gUx0PRgT4jopfid75tfM5MYcVyLl_QLtcu30Lkhd8MJaz6L_XjogzaGgciHC76bRvbhVnFw4mLK7UPW9Ng_yMK-NJ4kRK0mC3n-ZB7pSJ6oeU01cjSU&refresh_token=AQBS_bIavOr64SP7FU81D3zvFX-iowbHziA5QSZ_7GhZ1VfgqCZQHmEN4bcvdQFgVc0iJjeWgA2-KDiMFqA2oyKJKc6v9lTb4jOkshKwhIuImv1-e1jrrF_Hrb5IOsplciE'
    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

//TOP TRACKS API FETCH
   fetch(FETCH_URL, myOptions).then(response => response.json()).then(json => {
      const artist = json.artists.items[0];
      this.setState({artist});

   let FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
   fetch(FETCH_URL, {
     method: 'GET',
     headers: {
       'Authorization': 'Bearer ' + accessToken
     },
     mode: 'cors',
     cache: 'default'
         }).then(response => response.json()).then(json => {
        const { tracks } = json;
        this.setState({tracks});
      })
    });
}
  render() {

    return (<div className="App">
      <div className="App-title">Artist
      </div>
      <FormGroup>
        <InputGroup>
          <FormControl type="text" placeholder="Search for an Artist" value={this.state.query} onChange={event => {
              this.setState({query: event.target.value})
            }} onKeyPress={event => {
              if (event.key === 'Enter') {
                this.search()
              }
            }}/>
          <InputGroup.Addon onClick={() => this.search()}>
            <Glyphicon glyph="search"></Glyphicon>
          </InputGroup.Addon>
        </InputGroup>

      </FormGroup>
      {
        this.state.artist !== null
         ?
         <div>
          <Profile
          artist={this.state.artist}
          />
        <Gallery
          tracks= {this.state.tracks}/>
      </div>
        : <div>Search for an Artist DUDE!</div>
      }
    </div>)
  }
}
export default App;
