export default function Table({ headers, data, handleClick }) {
  return (
    <div className="flow-root mt-8" style={{ maxHeight: "calc(100vh - 80px)" }}>
    <div className="overflow-hidden rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-10 bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header?.key}
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  {header?.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr
                key={row?.key}
                className={handleClick ? "cursor-pointer" : "pointer-events-none"}
                onClick={() => handleClick(row)}
              >
                {headers.map((header) => (
                  <td
                    key={header?.key}
                    className="px-6 py-3 text-sm text-gray-900"
                  >
                    {row[header?.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  );
}
