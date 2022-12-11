const { default: api } = require("utils/api");

const dashboardCall = async () => {
  // admin dashboard
  try {
    const res = await api({ url: "dashboard", method: "GET" });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const hostsCall = async () => {
  // admin dashboard
  try {
    const res = await api({ url: "dashboard/hosts", method: "GET" });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.hostsCall = hostsCall;
exports.dashboardCall = dashboardCall;
