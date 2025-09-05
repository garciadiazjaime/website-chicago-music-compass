module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const url = `${process.env.NEXT_PUBLIC_EVENTS_API}/newsletter/`;

  const { email } = body;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email }),
    credentials: "same-origin",
  });

  if (response.status >= 400) {
    const result = await response.text();
    console.log({ result });
    return {
      statusCode: 400,
    };
  }

  const result = await response.json();

  console.log({ result });

  return {
    statusCode: 200,
  };
};
