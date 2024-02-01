export const templateRidePage = document.createElement('template');
templateRidePage.innerHTML = `<div class="row">
    <h2 id="title" class="col-12 display-4">
    </h2>
  </div>
  <div class="row">
    <div class="col-12">
      <div style="display: none" id="alert" class="alert alert-danger" role="alert">
        <h4 id="alert-heading" class="alert-heading">Prrt!</h4>
        <p id="alert-text"></p>
      </div>
    </div>
    <form id="form" class="col-6">
      <div class="form-group row">
        <label for="people-select" class="col-4 col-form-label">Amount of people</label>
        <div class="col-8">
          <select class="form-control" id="people-select">
            <option value="1">1 person</option>
            <option value="2">2 people</option>
            <option value="3">3 people</option>
            <option value="4">4 people</option>
            <option value="5">5 people</option>
            <option value="6">6 people</option>
          </select>
        </div>
      </div>
      <div class="mt-2" id="height-inputs">
      </div>
      <div class="form-group row mt-2">
        <div class="offset-md-4 col-md-8">
          <button id="previous-btn" type="button" class="btn btn-secondary">
          Previous
          </button>
          <button id="next-btn" type="submit" class="btn btn-success">
          Next
          </button>
        </div>
      </div>
    </form> 

    <div class="offset-1 col-4">
      <img id="ride-image" class="rounded img-fluid" alt="" />
    </div>
  </div>`;

export const heightTemplate = document.createElement('template');
heightTemplate.innerHTML = `<div class="form-group row">
  <label for="heightInput" class="col-md-4 col-form-label">Height</label>
  <div class="col-md-8">
    <input
      type="number"
      class="form-control form-control-lg"
      id="heightInput"
    />
  </div>
  </div>`;

export const minimalRideHeightTemplate = document.createElement('template');
minimalRideHeightTemplate.innerHTML = `<p class="lead">Minimum height: <span class="min-height"></span> cm</p>`;
