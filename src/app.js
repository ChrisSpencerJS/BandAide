import { http } from './http';
import { ui } from './ui';

document.querySelector('.post-submit').addEventListener('click', getData);

async function getData() {
  ui.clearCurrent();
  const searchTerm = await document.querySelector('#entry').value.trim();
  if(searchTerm) {
    callDiscogsAPI(searchTerm);
    callSongkickAPI(searchTerm);
  } else {
    console.log('You need to specify a band name!');
  }

}

function callDiscogsAPI(searchTerm) {
  const server = location.protocol + '//' + location.host;
  http.getText(`${server}/api/artist/${searchTerm}`)
    .then(id => {
      console.log(id);
      http.get(`${server}/api/releases/${id}`)
      .then(data => ui.displayDiscography(data))
      .catch(err => console.log(err));
    
    
      http.get(`${server}/api/profile/${id}`)
        .then(data => ui.displayBiography(data))
        .catch(err => console.log(err));
    })
    .catch(err => console.log("err"));
}

function callSongkickAPI(searchTerm) {
  const server = location.protocol + '//' + location.host;
  http.get(`${server}/api/live/${searchTerm}`)
    .then(gigs => { ui.displayLive(gigs) })
    .catch(err => console.log(err));
}