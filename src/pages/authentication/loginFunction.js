const { default: api } = require("utils/api");

const loginCall = async (userCredential) => {
  // admin login
  try {
    const res = await api({ url: "auth/admins", method: "POST", data: userCredential });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.loginCall = loginCall;
