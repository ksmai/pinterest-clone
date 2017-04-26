import { StorageService } from './storage.service';

describe('StorageService', () => {
  let storage: StorageService;
  let getSpy: jasmine.Spy;
  let setSpy: jasmine.Spy;

  beforeEach(() => {
    storage = new StorageService();
    getSpy = spyOn(window.localStorage, 'getItem');
    setSpy = spyOn(window.localStorage, 'setItem');
  });

  it('should be available', () => {
    expect(storage.available).toBe(true);
  });

  it('should get an item in localStorage', () => {
    const key = 'abc';
    storage.getItem(key);
    expect(getSpy).toHaveBeenCalledWith(key);
  });

  it('should set an item in localStorage', () => {
    const key = 'abc';
    const value = { bar: 'baz' };
    storage.setItem(key, value);
    expect(setSpy).toHaveBeenCalledWith(key, JSON.stringify(value));
  });
});
