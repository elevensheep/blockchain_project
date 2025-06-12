// src/Page/NFTSellPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Style/CarSellPage.css';

const NFTSellPage = () => {
    const { state } = useLocation();
    const initialForm = {
        seller_id: state?.profileId || '',
        seller_phone: state?.profilePhone || '',
        carNumber: state?.carId || '',
        manufacturer: state?.manufacturer || '',
        model: state?.model || '',
        type: state?.type || '',
        location: '',
        price: '',
        description: '',
    };
    console.log(initialForm)
    const navigate = useNavigate();
    const [form, setForm] = useState(initialForm);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const isSelling = false;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!imageFile) {
            setMessage('❌ 차량 이미지를 업로드해주세요.');
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('seller_id', form.seller_id);
            formData.append('seller_phone', form.seller_phone);
            formData.append('image', imageFile);
            formData.append('car_number', form.carNumber);
            formData.append('car_model', form.model);
            formData.append('model', form.model);
            formData.append('location', form.location);
            formData.append('price', form.price);
            formData.append('description', form.description);
            formData.append('type', form.type);
            formData.append('manufacturer', form.manufacturer);

            const res = await axios.post('http://localhost:8001/api/nft/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setMessage('✅ 등록 완료!');
            setForm({ ...initialForm, location: '', price: '', description: '' });
            setImageFile(null);
            setImagePreview(null);

            // ✅ 등록 성공 후 페이지 이동
            setTimeout(() => {
                navigate('/mypage');
            }, 1000);
        } catch (err) {
            console.error(err);
            setMessage(`❌ 오류: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="car-sell-form-page">
            <div className="car-sell-form-container">
                <h1 className="car-sell-form-title">NFT 차량 판매 등록</h1>
                <form className="car-sell-form-wrapper" onSubmit={handleSubmit}>

                    <div className="car-sell-form-group">
                        <label>등록번호</label>
                        <input
                            name="carNumber"
                            value={form.carNumber}
                            readOnly
                            className="car-sell-form-input"
                        />
                    </div>

                    <div className="car-sell-form-group image-upload">
                        <label htmlFor="image">차량 사진 업로드</label>
                        <label htmlFor="image" className="custom-file-upload">파일 선택</label>
                        <input
                            id="image"
                            name="image"
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

                    <div className="car-sell-form-group">
                        <label>제조사</label>
                        <input
                            name="manufacturer"
                            value={form.manufacturer}
                            readOnly
                            className="car-sell-form-input"
                        />
                    </div>
                    <div className="car-sell-form-group">
                        <label>모델</label>
                        <input
                            name="model"
                            value={form.model}
                            readOnly
                            className="car-sell-form-input"
                        />
                    </div>
                    <div className="car-sell-form-group">
                        <label>타입</label>
                        <input
                            name="type"
                            value={form.type}
                            readOnly
                            className="car-sell-form-input"
                        />
                    </div>

                    <div className="car-sell-form-group">
                        <label>판매 지역</label>
                        <input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            className="car-sell-form-input"
                            placeholder="예: 서울 강남구"
                            required
                        />
                    </div>

                    <div className="car-sell-form-group">
                        <label>희망 가격</label>
                        <input
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="car-sell-form-input"
                            placeholder="예: 23450000"
                            required
                        />
                    </div>

                    <div className="car-sell-form-group">
                        <label>설명</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="car-sell-form-textarea"
                            required
                        />
                    </div>

                    <div className="car-sell-form-button-container">
                        <button
                            type="submit"
                            className="car-sell-form-submit-button"
                            disabled={loading}
                        >
                            {loading ? '등록 중...' : '판매 등록하기'}
                        </button>

                    </div>
                </form>
                {message && <p className="result-message">{message}</p>}
            </div>
        </div>
    );
};

export default NFTSellPage;
