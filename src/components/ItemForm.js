import { useContext, useState } from 'react';
import FormInput from '../Utils/FormInput';
import { useNavigate } from 'react-router-dom';
import TextArea from '../Utils/TextArea';
import Label from '../Utils/Label';
import { EntityDetailsContext } from '../App';

const ItemForm = () => {
    const { setItemList } = useContext(EntityDetailsContext);
    const [inputValue, setInputValue] = useState({
        Item_Name: '',
        Item_Description: '',
        Price: '',
    });
    const [errors, setErrors] = useState({
        Item_Name: '',
        Description: '',
        Price: null,
    });
    const { Item_Name, Item_Description, Price } = inputValue;
    const navigate = useNavigate();
    const url = 'http://localhost:8080/v1/item/add';

    const handleChange = (type, e) => {
        console.log(e.target.value);
        const { value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    const handleBlur = (type, e) => {
        const { value } = e.target;
        console.log('handleBlur');
        if (value === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [type]: ` *${type} is a Required`,
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [type]: '',
            }));
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBodyJson = inputValue;
        requestBodyJson['Price'] = Number(requestBodyJson.Price);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestBodyJson),
        })
            .then(async (response) => {
                const x = await response.json();
                console.log(x, response);
                // return x;
                if (response.status !== 200) {
                    throw new Error(x.message);
                } else {
                    return x;
                }
            })
            .then((json) => {
                console.log(json);
                const responseItem = {
                    id: json.ItemId,
                    Item_Name: json.name,
                    Price: json.price,
                    Item_Description: json.description,

                    added_on: 'Today',
                };
                setItemList((prev) => {
                    console.log(prev);
                    return [...prev, responseItem];
                });
                alert('Item Added Successfully');
                navigate('/item');
            });
    };

    return (
        <div className="form-container">
            <div className="title">New Item</div>
            <form className="form item-form" onSubmit={handleSubmit}>
                <div className="input-container label-and-error">
                    <div className="lable-input ">
                        <FormInput
                            type="text"
                            value={Item_Name}
                            label="Name"
                            name="name"
                            onChange={handleChange.bind(null, 'Item_Name')}
                            onBlur={handleBlur.bind(null, 'Name')} //change the name of handleBlur
                        />
                        {errors.Name && <div className="error">{errors.Name}</div>}
                    </div>
                </div>
                <div className="input-container label-and-error">
                    <div className="lable-input">
                        <FormInput
                            type="text"
                            value={Price}
                            label="Price"
                            name="price"
                            onChange={handleChange.bind(null, 'Price')}
                            onBlur={handleBlur.bind(null, 'Price')}
                        />
                        {errors.Price && <div className="error">{errors.Price}</div>}
                    </div>
                </div>
                <div className="input-container label-and-error mb">
                    <div className="lable-input">
                        <Label label="Description" />
                        <TextArea
                            className={'description'}
                            label="Description"
                            id="Item_Description"
                            name="Item_Description"
                            value={Item_Description}
                            onChange={handleChange.bind(null, 'Item_Description')}
                            onBlur={handleBlur.bind(null, 'Description')}
                        />
                        {errors.Description && (
                            <div className="error ">{errors.Description}</div>
                        )}
                    </div>
                </div>
                <button className="submit-item">
                    {' '}
                    <i className="fa fa-file"></i>Save Item
                </button>
            </form>
        </div>
    );
};
export default ItemForm;
