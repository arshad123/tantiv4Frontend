const { default: api } = require("utils/api");

export const dashboardCall = async () => {
  // admin dashboard
  try {
    const res = await api({ url: "dashboard", method: "GET" });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const hostsCall = async () => {
  // admin dashboard
  try {
    const res = await api({ url: "dashboard/hosts", method: "GET" });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
