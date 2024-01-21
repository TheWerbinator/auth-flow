import bcrypt from "bcrypt";

const password = "password";

console.log('starting');
bcrypt.hash(password, 12).then((res) => {
  console.log(res);
});
