import { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../Component/CarCard';

const CarList = ({
    count,
    showBadges = true,
    showPrice = true,
}) => {
    const [cars, setCars] = useState([]);
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const [carRes, txRes] = await Promise.all([
                    axios.get('http://localhost:8001/api/car/all'),
                    axios.get('http://localhost:8001/api/transaction/active/car-ids'),
                ]);

                let carData = carRes.data.cars;
                const activeCarIds = txRes.data.activeCarIds;

                // 거래 중 차량 제외
                carData = carData.filter(car => !activeCarIds.includes(car._id));

                // 최신순 정렬 및 count 제한
                carData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                if (count) carData = carData.slice(0, count);

                setCars(carData);
            } catch (err) {
                console.error("🚨 차량 목록 또는 거래 필터링 실패:", err);
            }
        };

        fetchCars();
    }, [count]);


    return (
        <>
            {cars.map((car, index) => (
                <CarCard
                    key={car._id || index}
                    car_number={car.car_number}
                    carId={`${car._id}`}
                    image={`http://localhost:8001/uploads/${car.images && car.images.length > 0 ? car.images[0] : 'default.jpg'}`}
                    name={`${car.car_model}`}
                    price={`${car.price ? car.price.toLocaleString() : '가격 정보 없음'} 만원`}
                    badges={['diagnose', 'trust']}
                    isNFT={car.is_NFT}
                />
            ))}
        </>
    );
};

export default CarList;
