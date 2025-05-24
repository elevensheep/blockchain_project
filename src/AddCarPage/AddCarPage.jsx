import React from "react";
import { Link } from 'react-router-dom';
import "../Style/AddCarPage.css";

const AddCarPage = () => {
    return (
        <div className="add-car-page">
            <div className="form-container">
                <h1 className="title">내 차량 팔기를 시작합니다.</h1>
                <form className="car-form">
                    <div className="inline-field">
                        <label htmlFor="vin">차량 일련번호</label>
                        <input type="text" id="vin" className="input" placeholder="예: 12가3456" />
                        <span className="suffix">이며,</span>
                    </div>

                    <div className="inline-field">
                        <label htmlFor="owner">소유자명</label>
                        <input type="text" id="owner" className="input" placeholder="예: 홍길동" />
                        <span className="suffix">입니다.</span>
                    </div>

                    <p className="note">
                        차량은 차량번호와 소유자명으로만 입력해 주세요. (자동차등록증 기준)<br />
                        오정보 입력 시에는 다른 정보가 나올 수 있습니다.
                    </p>

                    <div className="button-container">
                        <button type="submit" className="submit-button">
                            <Link to="/carinfo" style={{ textDecoration: 'none', color: 'inherit' }}>
                                내 차량 조회하기
                            </Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCarPage;