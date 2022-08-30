const PopUp = (props) => {
    const { displayModel, showModel, children } = props;

    return (
        <div>
            {displayModel && (
                <div className="popup">
                    <div className="popup-inner">
                        <button type="primary" className="close-btn" onClick={showModel}>
              Close
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};
export default PopUp;
