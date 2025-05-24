import React from "react";
import "../Style/CarRepairPage.css";

const CarRepairPage = () => {
    const repairHistory = {
        frontPanel: "교체 - 2023-01-12",
        insidePanel: "이상 없음",
        frontWheelhouse: "수리 - 2022-09-21",
        rearWheelhouse: "이상 없음",
        pillarPanel: "교체 - 2023-03-03",
        dashPanel: "이상 없음",
        floorPanel: "이상 없음",
        sideSillPanel: "수리 - 2023-06-11",
        quarterPanel: "수리 - 2023-06-11",
        rearPanel: "이상 없음",
        trunkFloor: "이상 없음",
        sideMember: "이상 없음",
        roofPanel: "교체 - 2022-11-05",
        packageTray: "이상 없음",
        hood: "교체 - 2023-08-20",
        frontFender: "수리 - 2022-10-15",
        frontDoor: "이상 없음",
        rearDoor: "수리 - 2023-02-27",
        trunkLid: "이상 없음"
    };

    const partNameMap = {
        frontPanel: "프론트 패널",
        insidePanel: "인사이드 패널",
        frontWheelhouse: "앞휠하우스",
        rearWheelhouse: "뒷휠하우스",
        pillarPanel: "필러패널",
        dashPanel: "대쉬패널",
        floorPanel: "플로어패널",
        sideSillPanel: "사이드실 패널",
        quarterPanel: "쿼터패널",
        rearPanel: "리어패널",
        trunkFloor: "트렁크 플로어",
        sideMember: "사이드멤버",
        roofPanel: "루프패널",
        packageTray: "패키지트레이",
        hood: "후드",
        frontFender: "프론트 펜더",
        frontDoor: "앞문",
        rearDoor: "뒷문",
        trunkLid: "트렁크 리드"
    };

    return (
        <div className="repair-page-bg">
            <div className="repair-info-container">
                <div className="repair-title">
                    <h2>🛠 차량 수리 기록</h2>
                    <p>프레임 및 외부 패널 진단 내역</p>
                </div>
                <div className="repair-section">
                    <ul>
                        {Object.entries(repairHistory).map(([key, value]) => (
                            <li key={key}>
                                <span className="part-name">{partNameMap[key] || key}</span>
                                <span className="repair-status">{value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CarRepairPage;