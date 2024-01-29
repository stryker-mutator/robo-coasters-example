export class RideService {
  /**
   *
   * @returns {Promise<Ride[]>}
   */
  async getRides() {
    const response = await fetch('api/rides.json');
    return response.json();
  }
}

export const rideService = new RideService();
