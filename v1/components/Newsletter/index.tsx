import { ChangeEvent, useState } from "react";

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      return;
    }

    setLoading(true);

    const url = "/.netlify/functions/newsletter";
    await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email }),
      credentials: "same-origin",
    });

    setTimeout(() => {
      setLoading(false);
    }, 3_000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "stretch",
        gap: 20,
        justifyContent: "center",
        width: "calc(100% - 0px)",
        maxWidth: 780,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          maxWidth: 500,
          margin: "1rem",
        }}
      >
        <input
          type="text"
          value={email}
          onChange={handleChange}
          placeholder="Join our mailing list"
          disabled={loading}
          style={{
            padding: "6px 12px",
            fontSize: "18px",
            flex: 1,
          }}
        />
        <input
          type="submit"
          value="Join"
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: "red",
            color: "white",
            padding: "6px 20px",
            fontSize: "18px",
            border: "none",
            cursor: !loading ? "pointer" : "default",
          }}
        />
      </div>
      <div>{loading && "loading..."}</div>
      <style jsx>
        {`
          input::placeholder {
            font-style: italic;
            opacity: 0.6;
          }
        `}
      </style>
    </section>
  );
};

export default Newsletter;
