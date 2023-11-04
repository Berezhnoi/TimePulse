// Utils
import {uniqueId} from 'utils';

// Type
import {User} from 'types/models/user';

export class UserDTO implements User {
  private readonly _id: string;
  private readonly _username: string;

  /**
   * Create a new UserDTO instance
   *
   * @param {string} username - The username of the user
   */
  constructor(username: string) {
    this._id = uniqueId();
    this._username = username;
  }

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this._username;
  }
}
