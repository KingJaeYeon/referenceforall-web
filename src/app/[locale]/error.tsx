"use client";
export default function Error({ error }: { error: Error }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Something went wrong {error.message}</h1>
    </div>
  );
}
