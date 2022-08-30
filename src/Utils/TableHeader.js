const TableHeader = (props) => {
    const { columns, className } = props;
    return (
        <>
            {columns.map((item, index) => (
                <div className={className || 'table-header-row'} key={index}>
                    {item.title}
                </div>
            ))}
        </>
    );
};

export default TableHeader;
