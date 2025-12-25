import PairClient from "./PairClient";
export default function PairPage({ params }: { params: { pair: string } }) {
  return <PairClient pair={params.pair} />;
}
