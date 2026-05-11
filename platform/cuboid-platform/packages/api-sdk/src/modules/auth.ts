import { authService } from '@cuboid/domain-core';

export async function signup(input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  return authService.signup(input);
}

export async function signin(email: string, password: string) {
  return authService.signin(email, password);
}

export async function verify(token: string) {
  return authService.verify(token);
}

export async function refresh(refreshToken: string) {
  return authService.refresh(refreshToken);
}

export async function getUser(id: string) {
  return authService.getUser(id);
}
