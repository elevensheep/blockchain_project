import { useNavigate } from 'react-router-dom';
import '../Style/CarCard.css';

const badgeLabels = {
    diagnose: '진단 +',
    trust: '믿고',
};

const CarCard = ({
    image,
    name,
    price,
    badges = [],
    showBadges = true,
    showPrice = true,
    onDelete,           // 삭제 함수 prop 추가
    carId,              // 삭제 시 사용할 차량 id도 prop으로 받기
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/carinfo');
    };
     // 삭제 버튼 클릭 시 이벤트 버블링 막기 위해 e.stopPropagation()
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        if(onDelete && carId) {
            onDelete(carId);
        }
    };

    return (
        <div className="car-card" onClick={handleClick}>
            {showBadges && badges.length > 0 && (
                <div className="badges">
                    {badges.map((badge) => (
                        <span key={badge} className={`badge ${badge}`}>
                            {badgeLabels[badge] || badge}
                        </span>
                    ))}
                </div>
            )}
            <img src={image} alt={name} />
            <div className="car-name">{name}</div>
            {showPrice && price && <div className="car-price">{price}</div>}
            
            {/* 삭제 버튼 추가 */}
            {onDelete && (
                <button
                    className="delete-button"
                    onClick={handleDeleteClick}
                    title="삭제"
                >
                    삭제
                </button>
        )}
        </div>
    );
};

export default CarCard;