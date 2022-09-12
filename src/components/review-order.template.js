export const reviewOrderTemplate = document.createElement('template');
reviewOrderTemplate.innerHTML = `<div class="row">
    <h2 class="col-12 display-4">
      Order review
      <small class="text-muted"
        >- <span class="robo-total-amount"></span>
      ></small>
    </h2>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="robo-alert alert alert-danger" role="alert">
        <h4 class="alert-heading">Prrt!</h4>
        <p class="robo-alert-text"></p>
      </div>
    </div>
    <div class="col-12">
      <table class="robo-review-table table table-striped">
        <thead>
          <tr>
            <th>Drink</th>
            <th>#</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <form class="robo-submit-form ">
        <div class="robo-age-check form-group row">
          <label for="ageInput" class="col-2 col-form-label">Age</label
          >
          <div class="col-2">
            <input
              type="number"
              class="form-control form-control-lg"
              id="ageInput"
            />
          </div>
        </div>
        <button class="robo-cancel btn btn-default" type="button">
          Cancel
        </button>
        <button
          class="robo-submit btn btn-success"
          type="submit"
        >
          Order
        </button>
      </form>
    </div>
  </div>`;

export const reviewRowTemplate = document.createElement('template');
reviewRowTemplate.innerHTML = `<tr>
  <td>
    <em class="robo-name"></em>
  </td>
  <td class="robo-amount"></td>
  <td class="robo-price-per-drink"></td>
  <td class="robo-price"></td>
</tr>`;
