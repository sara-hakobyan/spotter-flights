export function stringifyingErrMsg(error: any) {
  let errMsg: string;
  if (error instanceof Error) {
    errMsg = error.message;
  } else {
    errMsg = error.toString();
  }
  return errMsg;
}
