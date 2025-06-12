import { useNavigate } from 'react-router-dom';
import '../Style/CarCard.css';

const badgeLabels = {
    NFT: 'NFT',
};

const CarCard = ({
    isNFT,
    image,
    name,
    price,
    showPrice = true,
    onDelete,           // 삭제 함수 prop 추가
    carId,              // 삭제 시 사용할 차량 id도 prop으로 받기
    car_number
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/carinfo/' + carId, );
    };
    // 삭제 버튼 클릭 시 이벤트 버블링 막기 위해 e.stopPropagation()
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        if (onDelete && carId) {
            onDelete(carId);
        }
    };
    console.log(carId)
    console.log(typeof isNFT, isNFT);
    return (
        <div className="car-card" onClick={handleClick}>

            {isNFT && (
                <span className="badge nft-badge" style={{border:'1px solid black',background:'black',float:'right'}}>{badgeLabels.NFT}</span>
            )}

            <div style={{ width: '90%', height: '200px', margin: '0 auto' }}>
                <img src={image} alt={name} />
            </div>
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