import { useState } from 'react';
import "../Style/CarSellPage.css";
import VEHICLE_DATA from "../Data/VehicleData";
import useRegisterCar from "../FetchComponent/useRegisterCar"; 

const CarSellPage = () => {
    const [form, setForm] = useState({
        brand: '', car_model: '', subModel: '', year: '',
        carNumber: '', price: '', location: '', description: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const { registerCar, loading, message } = useRegisterCar();
    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedForm = { ...form };

        if (name === "brand") {
            updatedForm = { brand: value, car_model: '', subModel: '', year: '', carNumber: '', price: '', location: '', description: '' };
        } else if (name === "car_model") {
            updatedForm = { ...form, car_model: value, subModel: '', year: '' };
        } else if (name === "subModel") {
            const [subModel, year] = value.split("|||");
            updatedForm = { ...form, subModel, year };
        } else {
            updatedForm[name] = value;
        }

        setForm(updatedForm);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'image/webp') {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const img = new Image();
                    img.onload = function () {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        canvas.toBlob((blob) => {
                            const convertedFile = new File([blob], file.name.replace(/\.webp$/, '.jpg'), { type: 'image/jpeg' });
                            setImageFile(convertedFile);
                            setImagePreview(URL.createObjectURL(convertedFile));
                        }, 'image/jpeg', 0.9);
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem('login_token');
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        const formData = new FormData();
        Object.entries(form).forEach(([key, val]) => formData.append(key, val));
        if (imageFile) formData.append('image', imageFile);

        const { success } = await registerCar(token, formData);
        if (success) {
            setForm({ brand: '', car_model: '', subModel: '', year: '', carNumber: '', price: '', location: '', description: '' });
            setImageFile(null);
            setImagePreview(null);
            alert('차량등록이 완료되었습니다');
        }
        
    };

    const uniqueBrands = [...new Set(VEHICLE_DATA.map(v => v.brand))];
    const uniqueModels = [...new Set(VEHICLE_DATA.filter(v => v.brand === form.brand).map(v => v.model))];
    const filteredSubModels = VEHICLE_DATA.filter(v => v.brand === form.brand && v.model === form.car_model);

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
                            <select name="car_model" value={form.car_model} onChange={handleChange} className="car-sell-form-input" disabled={!form.brand}>
                                <option value="">선택하세요</option>
                                {uniqueModels.map((m, i) => <option key={i} value={m}>{m}</option>)}
                            </select>
                        </div>
                        <div className="car-sell-form-group">
                            <label>세부모델 (연식 포함)</label>
                            <select
                                name="subModel"
                                value={`${form.subModel}|||${form.year}`}
                                onChange={handleChange}
                                className="car-sell-form-input"
                                disabled={!form.car_model}
                            >
                                <option value="">선택하세요</option>
                                {filteredSubModels.map((v, i) => (
                                    <option key={i} value={`${v.subModel}|||${v.year}`}>
                                        {`${v.subModel} (${v.year})`}
                                    </option>
                                ))}
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
                        <button type="submit" className="car-sell-form-submit-button" disabled={loading}>
                            {loading ? '등록 중...' : '판매 등록하기'}
                        </button>
                    </div>
                </form>

                {message && <p className="result-message">{message}</p>}
            </div>
        </div>
    );
};

export default CarSellPage;
