import { faker } from "@faker-js/faker";

export const getFirstName = () => faker.person.firstName();
export const getLastName = () => faker.person.lastName();
export const getFullName = () => faker.person.fullName();
export const getEmail = () => faker.internet.email();
export const getUsername = () => faker.internet.username();
export const getPassword = () => faker.internet.password();
export const getPhoneNumber = () =>
  faker.phone.number({ style: "international" });
