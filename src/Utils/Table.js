const Table = (props) => {
  const {
    column,
    datalist,
    setCurrentPage,
    currentPage,
    pagination = true,
  } = props;

  return (
    <div className="table-container">
      <table className="content-table">
        <thead>
          <tr>
            {column.map((item, index) =>
              item.title !== "ID" ? <th key={index}>{item.title}</th> : null
            )}
          </tr>
        </thead>
        <tbody>
          {datalist &&
            datalist.map((item, index) => (
              <tr key={index}>
                {column.map((col, key) =>
                  col.title !== "ID" ? (
                    <td key={key}>{col.render(item)}</td>
                  ) : null
                )}
              </tr>
            ))}
        </tbody>
      </table>
      {pagination === true ? (
        <div>
          {currentPage > 1 ? (
            <button
              onClick={() => {
                setCurrentPage((prePage) => {
                  if (prePage > 1) return prePage - 1;
                  return prePage;
                });
              }}
            >
              Prev
            </button>
          ) : null}

          <button
            onClick={() => {
              setCurrentPage((prePage) => {
                return prePage + 1;
              });
            }}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Table;
