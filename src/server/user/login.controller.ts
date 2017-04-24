import { User, UserModel } from './user.model';

export function login(user: User): Promise<any> {
  const query = { twitterID: user.twitterID };
  const updates = {
    $set: {
      name: user.name,
      picture: user.picture,
    },
  };
  const options = {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  };
    
  return UserModel
    .findOneAndUpdate(query, updates, options)
    .exec()
    .catch(error => {
      console.error(`Error in login controller: ${error}`);
      throw error;
    });
};
