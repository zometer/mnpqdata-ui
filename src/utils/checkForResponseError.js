
const checkForResponseError = (res, errString) => {
  if (res.ok) {
    return res;
  }
  if (!errString) {
    errString = "Error fetching unprocessed covers.";
  }
  throw Error(errString);
}

export default checkForResponseError;