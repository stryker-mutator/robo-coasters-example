interface Ride {
  name: string;
  price: number;
  mustBeAdult: boolean;
}

interface TicketOrder extends Ride {
  amount: number;
}

type RouteCallback = (route: string) => void;
