{
    class DrinkService {
        getDrinks() {
            return [
                { name: 'Roba Cola', price: 1.25, amount: 0 },
                { name: 'Robo Beer', price: 2.00, amount: 0 },
                { name: 'Rob(w)ine', price: 3.00, amount: 0 }
            ];
        }
    }

    app.service('drinkService', DrinkService);
}
