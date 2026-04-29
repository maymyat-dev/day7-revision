type SearchInputProps = {
  value: string;
  onChange: (val: string)=>void
}

function SearchInput({value, onChange}: SearchInputProps) {
  return (
    <input value={value} onChange={(e)=>onChange(e.target.value)} type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Search Products" required />
  )
}

export default SearchInput