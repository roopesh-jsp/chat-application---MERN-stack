export function senderName(users, user) {
  console.log(users, user);

  return user?.email == users[0]?.email ? users[1] : user[0];
}
