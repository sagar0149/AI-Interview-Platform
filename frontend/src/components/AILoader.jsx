function AILoader({
  text = "AI is analyzing..."
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <div
        style={{
          width: "90px",
          height: "90px",
          border:
            "8px solid rgba(255,255,255,0.15)",
          borderTop:
            "8px solid #22c55e",
          borderRadius: "50%",
          animation:
            "spin 1s linear infinite",
        }}
      />

      <h2
        style={{
          marginTop: "20px",
          color: "#22c55e",
          textAlign: "center",
        }}
      >
        🤖 {text}
      </h2>

      <p
        style={{
          color: "#94a3b8",
          marginTop: "10px",
        }}
      >
        Please wait...
      </p>
    </div>
  );
}

export default AILoader;