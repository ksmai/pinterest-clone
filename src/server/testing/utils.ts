import * as mongoose from 'mongoose';

export const testDatabase = 'mongodb://localhost/test';

export function setupTest(done: any) {
  (mongoose as any).Promise = Promise;

  if (mongoose.connection.readyState === 1) {
    return done();
  }

  return mongoose
    .connect(testDatabase)
    .then(done, done.fail);
}

export function resetTest(data: any[]) {
  return (done: any) => {
    const removes = data.map((datum) => datum.model.remove({}));

    return Promise
      .all(removes)
      .then(() => {
        const creates = data.map((datum) => datum.model.create(datum.value));

        return Promise.all(creates).then(done, done.fail);
      });
  };
}

export function teardownTest(done: any) {
  return mongoose
    .disconnect()
    .then(function waitUntilDisconnected(): any {
      if (mongoose.connection.readyState === 0) {
        return done();
      }

      return new Promise((resolve) => setTimeout(resolve, 500))
        .then(waitUntilDisconnected);
    })
    .catch(done.fail);
}
