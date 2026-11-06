type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  hint?: string
  suffix?: string
  autoComplete?: string
  inputMode?: "text" | "decimal" | "tel" | "email"
}

export function TextField({ id, label, value, onChange, error, hint, suffix, autoComplete, inputMode = "text" }: FieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy">
        {label}
      </label>
      <div className={`mt-2 flex items-center bg-white ring-1 ${error ? "ring-red-700" : "ring-line focus-within:ring-emerald"}`}>
        <input
          id={id}
          value={value}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="w-full bg-transparent px-3 py-3 text-ink outline-none"
        />
        {suffix ? <span className="pr-3 text-sm text-muted">{suffix}</span> : null}
      </div>
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  error?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full bg-white px-3 py-3 ring-1 outline-none ${error ? "ring-red-700" : "ring-line focus:ring-emerald"}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  error,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        rows={5}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full bg-white px-3 py-3 ring-1 outline-none ${error ? "ring-red-700" : "ring-line focus:ring-emerald"}`}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  )
}
