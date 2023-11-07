// Utils
import {uniqueId} from 'utils';

// Type
import {User} from 'types/models/user';

export class UserDTO implements User {
  readonly id: string;
  readonly username: string;

  /**
   * Create a new UserDTO instance
   *
   * @param {string} username - The username of the user
   */
  constructor(username: string) {
    this.id = uniqueId();
    this.username = username;
  }
}
