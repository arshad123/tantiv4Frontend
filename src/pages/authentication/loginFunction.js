const { default: api } = require("utils/api");

export default async (userCredential) => {
  // admin login
  try {
    const res = await api({ url: "auth/admins", method: "POST", data: userCredential });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
