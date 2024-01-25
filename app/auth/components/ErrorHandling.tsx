import { FieldErrors } from "react-hook-form";

interface Props {
  errors: FieldErrors<{ message: string }>;
  networkError: string | null;
}

export default function ErrorHandling({ errors, networkError }: Props) {
  return (
    (Object.keys(errors).length > 0 || networkError) && (
      <ul className="text-red-500 py-2 text-sm list-disc pl-6">
        {Object.entries(errors).map(([field, error]) => (
          <li key={field}>{error.message}</li>
        ))}
        {networkError && <li>{networkError}</li>}
      </ul>
    )
  );
}
