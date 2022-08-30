const TableRow = (props) => {
    const { children } = props;
    return (
        <>
            {children}
            {/* {dataList &&
        dataList.map((data, index) => (
          <div className="table-row-item" key={index}>
            {columns.map((col, key) => (
              <div className="table-header-row" key={key}>
                {col.render(data)}
              </div>
            ))}
          </div>
        ))} */}
        </>
    );
};

export default TableRow;
