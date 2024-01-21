import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const password = "password";

bcrypt.hash(password, 12).then((newPassHash) => {
  console.log(newPassHash);
  bcrypt.compare(password, newPassHash).then((res) => {
    console.log(
      "Does the new hash correctly compare to our original password? - ",
      res
    );
  });
});

const data = {
  name: "Jon",
};

const myJwt = jwt.sign(data, "super-secret");

const legitJwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9uIiwiaWF0IjoxNjk2NjIxMDg1fQ.Tplfr4Ms3eZFGlLQkSo10BM9o9kRnGJsgbxGNduTi88";
const editedJwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltIiwiaWF0IjoxNjk2NjIxMDg1fQ.SM-u3_W9a_zwxhfvYCPZIY2kgW3y0VFjU-GWqZcCyKY";

console.log(
  "JWT verification with legit token - ",
  jwt.verify(legitJwtToken, "super-secret")
);
console.log(
  "JWT verification with un-legit token - ",
  jwt.verify(editedJwtToken, "super-secret")
);
