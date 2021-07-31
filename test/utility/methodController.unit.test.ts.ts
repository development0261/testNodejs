const faker = require('faker');
const startConnection = require('../../src/methodRouter.controller')
const { GetData, PostData, PatchData, DeleteData } = require('../../src/methodRouter.controller')
import { expect } from 'chai';
import 'mocha';

describe('connection test', () => {

  it('should return success full connection', () => {
    expect(startConnection);
  });

  it('should return getMethod is called', () => {
    expect(GetData)
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
      await expect(GetData(userGet));
    });

  });
  it('should return PostMethod is called', () => {
    expect(PostData)
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
    await expect(PostData(newUser));
  });
  
  it('should return PatchMethod is called', () => {
    expect(PatchData)
  });
  it('should return DeleteMethod is called', () => {
    expect(DeleteData)
  });

  it('should return DeleteMethod is', () => {
    if (typeof DeleteData === "function") {
      if (!DeleteData()) {
        return Promise.resolve();
      }
    } else if (GetData === false) {
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
    await expect(PatchData(updateUser));
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
      await expect(DeleteData(deleteUser));
    });
    });
});