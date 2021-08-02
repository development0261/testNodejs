const faker = require('faker');
const initial = require('../../src/controller')
const { GetMethod, PostMethod, PatchMethod, DeleteMethod } = require('../../src/controller')
import { expect } from 'chai';
import 'mocha';
describe('connection test', () => {
  it('should return success full connection', () => {
    //test connection
    expect(initial);
  });

  it('should return getMethod is called', () => {
    expect(GetMethod)
  });
  describe('User validation', () => {
    let userGet;

    beforeEach(() => {
      userGet = {
        id: faker.name.findName(),
        firstName: faker.name.findName(),
        lastName: faker.name.findName(),
        phoneNumber: faker.name.findName(),
      };

    });
    it('should correctly validate a valid user', async () => {
      await expect(GetMethod(userGet));
    });

  });
  it('should return PostMethod is called', () => {
    expect(PostMethod)
  });
  let newUser
  beforeEach(() => {
    newUser = {
      id: faker.name.findName(),
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
      phoneNumber: faker.name.findName(),
    };

  });
  it('should correctly validate a valid user', async () => {
    await expect(PostMethod(newUser));
  });
  
  it('should return PatchMethod is called', () => {
    expect(PatchMethod)
  });
  it('should return DeleteMethod is called', () => {
    expect(DeleteMethod)
  });

  it('should return DeleteMethod is', () => {
    if (typeof DeleteMethod === "function") {
      if (!DeleteMethod()) {
        return Promise.resolve();
      }
    } else if (GetMethod === false) {
      return Promise.resolve();
    }
  });
  describe('User update details validation', () => {

  let updateUser
  beforeEach(() => {
    newUser = {
      id: faker.name.findName(),
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
      phoneNumber: faker.name.findName(),
    };
  });
  it('should correctly validate a valid user', async () => {
    await expect(PatchMethod(updateUser));
  });
  });
  describe('User delete details validation', () => {

    let deleteUser
    beforeEach(() => {
      newUser = {
        id: faker.name.findName(),
        phoneNumber: faker.name.findName(),
      };
    });
    it('should correctly validate a valid user', async () => {
      await expect(DeleteMethod(deleteUser));
    });
    });
});