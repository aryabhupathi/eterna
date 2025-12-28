import PairClient from "./PairClient";
export default async function PairPage({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  return <PairClient pair={pair} />;
}
