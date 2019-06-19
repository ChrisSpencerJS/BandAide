/**
 * UI Library
 * Library for updating UI elements
 *
 * @version 1.0.0
 * @author  Chris Spencer
 * @license MIT
 *
 **/

class UI {

  constructor() {
  
    this.discographyContent = document.querySelector('#discography');
    this.biographyContent = document.querySelector('.wrapper');
    this.liveContent = document.querySelector('#live');
  }

  displayDiscography(releases) {
    let output = '';
    //console.log(releases);
    const albums = JSON.parse(releases).releases.filter((release) => {
      return release.id < 99999;
    })
    //console.log(albums);
    albums.forEach(function(release) {
      output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-2">
              <img src="${release.thumb}" alt=${release.thumb}</img>
            </div>
            <div class="col-md-5">
              <ul class="list-group">
                <div class="list-group-item">Title: ${release.title}</div>
                <div class="list-group-item">Year: ${release.year}</div>    
                <div class="list-group-item">Artist: ${release.artist}</div>            
              </ul> 
            </div>
          </div>
        </div>`;
    });
    this.discographyContent.innerHTML += output;  
  }

  displayBiography(profile) {
    //console.log(profile);
    profile = JSON.parse(profile);
    this.biographyContent.innerHTML = `<p mb-5>${profile.profile}</p>`;

    if(profile.members) {                          
      profile.members.forEach((member) => {
        this.biographyContent.innerHTML += `  <div>
                                                <img src="${member.thumbnail_url}" title="${member.name}" class="img-thumbnail" width="304" height="236"</img>
                                              </div>`;
        })
    }
    this.biographyContent.innerHTML += '<br><br>';
    
    if(profile.images) {
      let output = '';
      profile.images.forEach(function(image) {
        output += `
          <div>
            <img src="${image.uri}" class="img-thumbnail" alt=${image.uri} width="304" height="236"</img>
          </div>`;
      });
      this.biographyContent.innerHTML += output;  
    }
  }

  displayLive(gigs) {
    gigs = JSON.parse(gigs);
    let output = '';
    output += `
    <table class="table table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Venue</th>
        <th>City</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
    `;
    gigs.resultsPage.results.event.forEach(function(event) {
      output += `
      <tr>
        <td>${event.displayName}</td>
        <td>${event.venue.displayName}</td>
        <td>${event.location.city}</td>
        <td>${event.start.date}</td>
      </tr>
      `;
    })
    output += `
    </tbody>
    </table>
    `;
    
    this.liveContent.innerHTML = output;
  }

  clearCurrent() {
    this.discographyContent.innerHTML = '';
    this.biographyContent.innerHTML = '';
    this.liveContent.innerHTML = '';
  }
}

export const ui = new UI();