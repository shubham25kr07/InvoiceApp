import { useState } from 'react';

const SelectList = (props) => {
    const { dataList, setList, optionValue } = props;
    const [val, setVal] = useState([]);

    const addSelectedRows = (e) => {
        e.preventDefault();
        // console.log(val);
        console.log(val);
        setList(val);
    };

    const handleChangeNormalSelect = (e) => {
        const updatedOptions = [...e.target.options]
            .filter((option) => option.selected)
            .map((x) => Number(x.value));
        setVal(updatedOptions);
    };
    return (
        <form id="form2" onSubmit={addSelectedRows}>
            <select
                className="select-list"
                width="100%"
                onChange={handleChangeNormalSelect}
                multiple
                id="selectId"
            >
                {dataList.map((data, index) => {
                    return (
                        <option className="list-option" value={index}>
                            {optionValue.map((col, key) => (
                                <div key={key}>{col.render(data)}</div>
                            ))}
                        </option>
                    );
                })}
            </select>
            <div className="button-div">
                <button className="add-button">Add</button>
            </div>
        </form>
    );
};
export default SelectList;
