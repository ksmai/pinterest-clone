import { UserModel } from './user.model';

export function deserialize(id: string): Promise<any> {
  return UserModel
    .findById(id)
    .exec()
    .then(user => {
      if (!user) {
        const err = `"${id}" not found`;
        console.error(`Error in deserialize: ${err}`);
        throw new Error(err);
      }

      return user;
    });
}
