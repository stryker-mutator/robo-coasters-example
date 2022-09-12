export const templatePlaceOrder = document.createElement('template');
templatePlaceOrder.innerHTML = `
  <div class="row">
    <h2 class="col-12 display-4">Place order - prrrt</h2>
  </div>
  <div class="row">
    <table class="robo-order-table table col-12">
      <thead>
        <tr>
          <th>Drink</th>
          <th colspan="2">Price</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <th class="robo-total-price"></th>
        </tr>
      </tfoot>
    </table>
  </div>
  <div class="row">
    <div class="col-12">
      <button
        class="btn btn-success robo-submit"
        type="submit"
      >
        Submit order
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-12">&nbsp;</div>
  </div>
`;

export const templateOrderRow = document.createElement('template');
templateOrderRow.innerHTML = `<tr>
  <td class="robo-name"></td>
  <td class="robo-price"></td>
  <td>
    <div class="row">
      <div class="col-5">
        <div class="input-group">
          <div class="input-group-prepend">
            <button class="btn btn-dark robo-decrement">-</button>
          </div>
          <input class="form-control robo-amount" type="number" readonly />
          <div class="input-group-append">
            <button class="btn btn-dark robo-increment">+</button>
          </div>
        </div>
      </div>
    </div>
  </td>
</tr>`;
