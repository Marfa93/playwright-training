import { faker } from "@faker-js/faker";

export const getFirstName = () => faker.person.firstName();
export const getLastName = () => faker.person.lastName();
export const getFullName = () => faker.person.fullName();
export const getEmail = () => faker.internet.email();
export const getUsername = () => faker.internet.username();
export const getPassword = () => faker.internet.password();
export const getPhoneNumber = () =>
  faker.phone.number({ style: "international" });
export const getRandomNumber = () => faker.number.int({ min: 100, max: 5000 });
export const getRandomBool = () => faker.datatype.boolean();
export const getRandomWord = () => faker.word.noun();
