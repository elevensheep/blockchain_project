import { useState } from 'react';
import "../Style/CarSellPage.css";
import VEHICLE_DATA from "../Data/VehicleData";

const CarSellPage = () => {
    const [form, setForm] = useState({
        brand: '',
        car_model: '',
        subModel: '',
        year: '',
        carNumber: '',
        price: '',
        location: '',
        description: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState('');

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
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem('login_token');
        console.log('Access Token:', token);

        if (!token) {
            setMessage('로그인이 필요합니다.');
            return;
        }

        const formData = new FormData();
        formData.append('brand', form.brand);
        formData.append('car_model', form.car_model);
        formData.append('subModel', form.subModel);
        formData.append('car_year', form.year);
        formData.append('price', form.price);
        formData.append('carNumber', form.carNumber);
        formData.append('location', form.location);
        formData.append('description', form.description);

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await fetch('http://localhost:8001/api/car/register', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('차량이 성공적으로 등록되었습니다! 차량 ID: ' + result.car_id);
                setForm({
                    brand: '',
                    car_model: '',
                    subModel: '',
                    year: '',
                    carNumber: '',
                    price: '',
                    location: '',
                    description: ''
                });
                setImageFile(null);
                setImagePreview(null);
            } else {
                setMessage('차량 등록 실패: ' + (result.error || '알 수 없는 오류'));
            }
        } catch (error) {
            setMessage('서버 통신 중 오류가 발생했습니다: ' + error.message);
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
                        <button type="submit" className="car-sell-form-submit-button">판매 등록하기</button>
                    </div>
                </form>

                {message && <p className="result-message">{message}</p>}
            </div>
        </div>
    );
};

export default CarSellPage;
