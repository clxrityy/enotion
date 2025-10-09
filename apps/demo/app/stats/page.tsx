export const dynamic = "force-dynamic";

export default async function StatesPage() {
  const getSystemSnapshot = await import("@enotion/server/system").then(
    (mod) => mod.default,
  );

  const snapshot = await getSystemSnapshot();

  return (
    <div className="page" style={{ padding: "20px" }}>
      <pre>{JSON.stringify(snapshot, null, 2)}</pre>
    </div>
  );
}
