import { useState } from 'react';
import "../Style/CarSellPage.css";

// 외부 데이터: 추후 API 연동 가능
const carTypes = ["승용", "SUV", "승합", "EV"];
const carModels = ["아반떼", "소나타", "싼타페", "그랜저"];

const CarSellPage = () => {
    const [form, setForm] = useState({
        manufacturer: '',
        manufactureYear: '',
        carNumber: '',
        price: '',
        type: '',
        carName: '',
        description: ''
    });

    const [imageFile, setImageFile] = useState(null);  // 이미지 파일 상태 추가
    const [imagePreview, setImagePreview] = useState(null);

    // 판매 등록 결과 메시지 상태
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);  // 이미지 파일 상태 저장
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const seller_id = "loggedInUserId"; // 실제 로그인 ID 넣기

        // FormData 객체 생성
        const formData = new FormData();
        formData.append('seller_id', seller_id);
        formData.append('car_model', form.carName);
        formData.append('car_year', Number(form.manufactureYear));
        formData.append('car_number', form.carNumber);
        formData.append('price', Number(form.price));
        formData.append('type', form.type);
        formData.append('manufacturer', form.manufacturer);
        formData.append('description', form.description);

        if (imageFile) {
            formData.append('image', imageFile);  // 이미지 파일 첨부
        }

        try {
            const response = await fetch('http://localhost:5000/api/car/register', {
                method: 'POST',
                body: formData,  // JSON이 아닌 FormData로 전송
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('차량이 성공적으로 등록되었습니다! 차량 ID: ' + result.car_id);
                // 초기화
                setForm({
                    manufacturer: '',
                    manufactureYear: '',
                    carNumber: '',
                    price: '',
                    type: '',
                    carName: '',
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

    return (
        <div className="car-sell-form-page">
            <div className="car-sell-form-container">
                <h1 className="car-sell-form-title">내 차량 상세 정보 등록</h1>
                <form className="car-sell-form-wrapper" onSubmit={handleSubmit}>
                    <div className="car-sell-form-group image-upload">
                        <label htmlFor="image">차량 사진 업로드</label>

                        <label htmlFor="image" className="custom-file-upload">
                            파일 선택
                        </label>
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
                            <input
                                className="car-sell-form-input"
                                name="manufacturer"
                                value={form.manufacturer}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="car-sell-form-group">
                            <label>연식</label>
                            <input
                                className="car-sell-form-input"
                                name="manufactureYear"
                                value={form.manufactureYear}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="car-sell-form-group">
                            <label>차종</label>
                            <select
                                className="car-sell-form-input"
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                            >
                                <option value="">선택하세요</option>
                                {carTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="car-sell-form-group">
                            <label>모델명</label>
                            <select
                                className="car-sell-form-input"
                                name="carName"
                                value={form.carName}
                                onChange={handleChange}
                            >
                                <option value="">선택하세요</option>
                                {carModels.map((model, index) => (
                                    <option key={index} value={model}>{model}</option>
                                ))}
                            </select>
                        </div>
                        <div className="car-sell-form-group">
                            <label>차대번호</label>
                            <input
                                className="car-sell-form-input"
                                name="carNumber"
                                value={form.carNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="car-sell-form-group">
                            <label>희망 가격</label>
                            <input
                                className="car-sell-form-input"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="car-sell-form-group">
                        <label>설명</label>
                        <textarea
                            className="car-sell-form-textarea"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />
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
