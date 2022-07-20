function success({ res, data, status, message }) {
  res.status(status ?? 200).send({
    data: data ?? null,
    message: message ?? null
  })
}

function error({ res, message, status }) {
  res.status(status ?? 500).send({
    error: message ?? null
  })
}

export default {
  success,
  error
}
