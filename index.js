var express = require('express');
var app = express();
var path = require('path');
var request = require('request');

// https://www.discogs.com/developers/#page:home,header:home-quickstart
const token = 'redacted';

// https://www.songkick.com/developer/getting-started
const apiKey = 'redacted';

app.use(express.static('build'));

app.get('/api/artist/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  let artistData;

  var options = {
    url: `https://api.discogs.com/database/search?q=${searchTerm}&type=artist&token=${token}`,
    headers: {
      'User-Agent': 'BandAid/1.0.0/StudentProject'
    }
  };
  request(options, (error, response, body) => {
    if(error) {
      console.log(error);
    }

    const results = JSON.parse(body).results;
  
    artistData = results.filter((result) => {
        return result.type === 'artist' && result.title === searchTerm;
      })
    let id = artistData[0].id;
    res.send(id.toString());
  });
    
});

app.get('/api/profile/:id', function(req, res) {
  const id = req.params.id;

  var options = {
    url: `https://api.discogs.com/artists/${id}?token=${token}`,
    headers: {
      'User-Agent': 'BandAid/1.0.0/StudentProject'
    }
  };
  request(options, (error, response, body) => {
    if(error) {
      console.log(error);
    }
   
    res.json(body);
  });
});

app.get('/api/releases/:id', function(req, res) {

  const id = req.params.id;

  var options = {
    url: `https://api.discogs.com/artists/${id}/releases?token=${token}`,
    headers: {
      'User-Agent': 'BandAid/1.0.0/StudentProject'
    }
  };
  request(options, (error, response, body) => {
    if(error) {
      console.log(error);
    }
    //const results = JSON.parse(body).results;   
    res.json(body);
  });
});

app.get('/api/live/:searchTerm', function(req, res) {
  const searchTerm = req.params.searchTerm;

  var options = {
    url: `https://api.songkick.com/api/3.0/search/artists.json?query=${searchTerm}&apikey=${apiKey}`,
    headers: {
      'User-Agent': 'BandAid/1.0.0/StudentProject'
    }
  };
  request(options, (error, response, body) => {
    if(error) {
      console.log(error);
    }

    const artists = JSON.parse(body).resultsPage.results.artist.filter((result) => {
      return result.displayName == searchTerm;
    })
    const id = artists[0].id;
    console.log(id);
    
    if(id) {
      var options = {
        url: `https://api.songkick.com/api/3.0/artists/${id}/gigography.json?apikey=${apiKey}`,
        headers: {
          'User-Agent': 'BandAid/1.0.0/StudentProject'
        }
      };

      request(options, (error, response, body) => {
        if(error) {
          console.log(error);
        }
      
        res.json(body);
      });
    }
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT);
