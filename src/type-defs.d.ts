interface Ride {
  name: string;
  id: string;
  image: string;
  description: string;
  minHeight?: number;
}

interface RideOrder {
  people: Person[];
  ride: Ride;
}

interface Person {
  index: number;
  height: number;
}

type RouteCallback = (route: string[]) => void;
