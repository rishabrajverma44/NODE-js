const sessionIdToUserMap = new Map();

export function setUser(id: string, user: object) {
  sessionIdToUserMap.set(id, user);
}

export function getUser(id: string) {
  return sessionIdToUserMap.get(id);
}
