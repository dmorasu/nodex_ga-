"use client"

type Props = {
  value: number
  onChange: (value: number) => void
}

export default function RatingInput({ value, onChange }: Props) {

  return (
    <div className="flex gap-3">
      {[1,2,3,4].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`px-4 py-2 rounded border
          ${value === n ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          {n}
        </button>
      ))}
    </div>
  )
}