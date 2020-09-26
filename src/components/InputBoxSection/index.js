import "./style.css";

const InputBoxSection = () => {
    return `
        <div class='input-section'>
            <textarea class="json-text" id='jsonData'/></textarea>
            <div class='input-year'>
                <div class='year-text'>
                    Year
                </div>
                <input id = 'yearData' type="text" class='input-area' maxLength='4'>
                <button class="btn-view" id='update-btn'>UPDATE</button>
            </div>
        </div>
    `;
};

export default InputBoxSection;
