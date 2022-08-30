const TableCell = ({ data, className }) => {
    return (
        <div className={className || 'table-cell'}>
            <div>{data}</div>
        </div>
    );
};

export default TableCell;
