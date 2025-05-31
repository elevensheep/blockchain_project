import { useState } from 'react';
import "../Style/CarSellPage.css";

const CarSellPage = () => {
    const [form, setForm] = useState({
        carName: '',
        manufacturer: '',
        manufactureYear: '',
        firstRegistration: '',
        carNumber: '',
        type: '',
        fuel: '',
        engineSize: '',
        drivetrain: '',
        color: '',
        mileage: '',
        productionDate: '',
        userName: '',
        registrationNumber: '',
        usageHistory: '',
        insuranceHistory: '',
        numberOfTransfers: '',
        regularInspection: '',
        price: '',
        description: ''
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
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

    return (
        <div className="car-sell-page">
            <div className="form-container">
                <h1 className="title">내 차량 상세 정보 등록</h1>
                <form className="car-sell-form" onSubmit={handleSubmit}>
                    <div className="image-upload">
                        <label htmlFor="image">차량 사진 업로드</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                        {imagePreview && <img src={imagePreview} alt="미리보기" />}
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>차명 / 모델명</label>
                            <input className="car-sell-input" name="carName" value={form.carName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>제조사</label>
                            <input className="car-sell-input" name="manufacturer" value={form.manufacturer} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>연식</label>
                            <input className="car-sell-input" name="manufactureYear" value={form.manufactureYear} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>최초 등록일</label>
                            <input className="car-sell-input" name="firstRegistration" value={form.firstRegistration} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>차대번호</label>
                            <input className="car-sell-input" name="carNumber" value={form.carNumber} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>차종</label>
                            <input className="car-sell-input" name="type" value={form.type} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>연료</label>
                            <input className="car-sell-input" name="fuel" value={form.fuel} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>배기량</label>
                            <input className="car-sell-input" name="engineSize" value={form.engineSize} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>구동방식</label>
                            <input className="car-sell-input" name="drivetrain" value={form.drivetrain} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>색상</label>
                            <input className="car-sell-input" name="color" value={form.color} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>주행거리</label>
                            <input className="car-sell-input" name="mileage" value={form.mileage} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>생산일자</label>
                            <input className="car-sell-input" name="productionDate" value={form.productionDate} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>소유자명</label>
                            <input className="car-sell-input" name="userName" value={form.userName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>등록번호</label>
                            <input className="car-sell-input" name="registrationNumber" value={form.registrationNumber} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>용도 이력</label>
                            <input className="car-sell-input" name="usageHistory" value={form.usageHistory} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>보험 이력</label>
                            <input className="car-sell-input" name="insuranceHistory" value={form.insuranceHistory} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>이전 횟수</label>
                            <input className="car-sell-input" name="numberOfTransfers" value={form.numberOfTransfers} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>정기검사</label>
                            <input className="car-sell-input" name="regularInspection" value={form.regularInspection} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>희망 가격</label>
                            <input className="car-sell-input" name="price" value={form.price} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>설명</label>
                        <textarea className="car-sell-textarea" name="description" value={form.description} onChange={handleChange} />
                    </div>

                    <div className="button-container">
                        <button type="submit" className="submit-button">판매 등록하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CarSellPage;