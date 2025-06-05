import { useState } from 'react';
import "../Style/CarSellPage.css";
import VEHICLE_DATA from "../Data/VehicleData";

const CarSellPage = () => {
    const [form, setForm] = useState({
        brand: '',
        model: '',
        subModel: '',
        year: '',
        carNumber: '',
        price: '',
        location: '',
        description: ''
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
            ...(name === "brand" && { model: '', subModel: '', year: '' }),
            ...(name === "model" && { subModel: '', year: '' }),
            ...(name === "subModel" && { year: '' }),
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("판매 등록 정보:", form);
        alert("차량이 성공적으로 등록되었습니다!");
    };

    const uniqueBrands = [...new Set(VEHICLE_DATA.map(v => v.brand))];
    const filteredModels = VEHICLE_DATA.filter(v => v.brand === form.brand).map(v => v.model);
    const uniqueModels = [...new Set(filteredModels)];

    const filteredSubModels = VEHICLE_DATA.filter(v => v.brand === form.brand && v.model === form.model).map(v => v.subModel);
    const uniqueSubModels = [...new Set(filteredSubModels)];

    return (
        <div className="car-sell-form-page">
            <div className="car-sell-form-container">
                <h1 className="car-sell-form-title">내 차량 상세 정보 등록</h1>
                <form className="car-sell-form-wrapper" onSubmit={handleSubmit}>
                    <div className="car-sell-form-group image-upload">
                        <label htmlFor="image">차량 사진 업로드</label>
                        <label htmlFor="image" className="custom-file-upload">파일 선택</label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        {imagePreview && (
                            <div className="image-preview-wrapper">
                                <img src={imagePreview} alt="미리보기" className="image-preview" />
                            </div>
                        )}
                    </div>

                    <div className="car-sell-form-grid">
                        <div className="car-sell-form-group">
                            <label>제조사</label>
                            <select name="brand" value={form.brand} onChange={handleChange} className="car-sell-form-input">
                                <option value="">선택하세요</option>
                                {uniqueBrands.map((b, i) => <option key={i} value={b}>{b}</option>)}
                            </select>
                        </div>
                        <div className="car-sell-form-group">
                            <label>모델</label>
                            <select name="model" value={form.model} onChange={handleChange} className="car-sell-form-input" disabled={!form.brand}>
                                <option value="">선택하세요</option>
                                {uniqueModels.map((m, i) => <option key={i} value={m}>{m}</option>)}
                            </select>
                        </div>
                        <div className="car-sell-form-group">
                            <label>세부모델</label>
                            <select name="subModel" value={form.subModel} onChange={handleChange} className="car-sell-form-input" disabled={!form.model}>
                                <option value="">선택하세요</option>
                                {uniqueSubModels.map((s, i) => <option key={i} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="car-sell-form-group">
                            <label>판매 지역</label>
                            <input name="location" value={form.location} onChange={handleChange} className="car-sell-form-input" placeholder="예: 서울 강남구" />
                        </div>
                        <div className="car-sell-form-group">
                            <label>차대번호</label>
                            <input name="carNumber" value={form.carNumber} onChange={handleChange} className="car-sell-form-input" placeholder="예: 12가3456" />
                        </div>
                        <div className="car-sell-form-group">
                            <label>희망 가격</label>
                            <input name="price" value={form.price} onChange={handleChange} className="car-sell-form-input" placeholder="예: 2345만원" />
                        </div>
                    </div>
                    <div className="car-sell-form-group">
                        <label>설명</label>
                        <textarea name="description" value={form.description} onChange={handleChange} className="car-sell-form-textarea" />
                    </div>
                    <div className="car-sell-form-button-container">
                        <button type="submit" className="car-sell-form-submit-button">판매 등록하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CarSellPage;