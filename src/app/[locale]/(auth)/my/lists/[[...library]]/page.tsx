export async function generateStaticParams() {
  const allowedPaths = ["", "saved"];
  return allowedPaths.map((path) => ({ library: path }));
}

export default function Page() {
  return null;
}
