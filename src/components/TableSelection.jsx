export default function TableSelection({ value, onChange }) {
  return (
    <fieldset className="field">
      <legend>Choose a table</legend>
      <div className="table-options">
        {['Table 1', 'Table 2', 'Table 3', 'Table 4'].map((table) => (
          <label className={value === table ? 'table-option selected' : 'table-option'} key={table}>
            <input type="radio" name="table" value={table} checked={value === table} onChange={() => onChange(table)} />
            {table}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
