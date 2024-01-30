export class RideService {
  /**
   *
   * @returns {Promise<Ride[]>}
   */
  async getRides() {
    const response = await fetch('api/rides.json');
    return response.json();
  }

  /**
   *
   * @param {string} rideId
   * @returns {Promise<Ride | undefined>}
   */
  async getRide(rideId) {
    const rides = await this.getRides();
    return rides.find((ride) => ride.id === rideId);
  }
}

export const rideService = new RideService();
