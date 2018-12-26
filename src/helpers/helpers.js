const __resStatGen = reply => {
  let status = 200;
  let body = reply;

  if (reply.errorCode) {
    status = reply.errorCode;
    body = reply.message;
  }

  return {
    status: status,
    body: body
  };
};

const __fieldsCheck = (fields, fieldsParams) => {
  for (let field of fields) {
    if (field === undefined) {
      return {
        error: true,
        status: 404,
        message: `Required fields: ${fieldsParams}`
      };
    }
  }

  return { error: false };
};

module.exports = () => {
  return {
    resStatGen: __resStatGen,
    fieldsCheck: __fieldsCheck
  };
};
