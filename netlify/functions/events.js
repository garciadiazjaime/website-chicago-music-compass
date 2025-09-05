module.exports.handler = async () => {
  const url = `${process.env.NEXT_PUBLIC_S3_URL}/public/events.json`;

  const res = await fetch(url);

  if (!res.ok) {
    return {
      statusCode: 400,
    };
  }

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
