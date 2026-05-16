import { TraceDetail } from "../../../components/TraceDetail";

export default function TracePage({ params }) {
  return <TraceDetail runId={params.runId} />;
}
