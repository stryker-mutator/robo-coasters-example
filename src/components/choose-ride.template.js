export const templateChooseRide = document.createElement('template');
templateChooseRide.innerHTML = `
  <div class="row">
    <h2 class="col-12 display-4">Choose your ride - prrrt</h2>
  </div>
  <div id="rides" class="row">
  </div>
  <div class="row">
    <div class="col-12">&nbsp;</div>
  </div>
`;

export const templateRide = document.createElement('template');
templateRide.innerHTML = `
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card">
      <img class="card-img-top" src="" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">Ride name</h5>
        <p class="card-text">Ride description</p>
        <a href="#" class="card-link btn btn-primary">Choose</a>
      </div>
    </div>
  </div>
`;
