{
    class RobobarComponent {
        constructor() {
            this.title = 'Robobar'
        }
    }

    app.component('roboRobobar', {
        templateUrl: '/src/robobar-component/robobar-component.html',
        controller: RobobarComponent,
        controllerAs: 'cpt'
    });
}