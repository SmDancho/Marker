import type { user } from '../types/';

export const useAdmin = (user: user) => {
  const checkIsAdmin = user?.roles.includes('ADMIN');
  return checkIsAdmin ? true : false;
};
