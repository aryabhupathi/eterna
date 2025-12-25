export function EmptyState({
  message = "No tokens found",
}: {
  message?: string;
}) {
  return (
    <div className="text-center text-sm text-slate-500 py-8">
      {message}
    </div>
  );
}
