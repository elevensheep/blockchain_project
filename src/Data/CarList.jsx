import { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../Component/CarCard';

const CarList = ({
    count,    //보여줄 차량 개수
    showBadges = true,
    showPrice = true,
}) => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/car/all');
                let carData = response.data.cars;

                // ✅ created_at 기준 최신순 정렬
                carData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                // ✅ count만큼 자르기 (예: count=3 이면 최신 3개만)
                if (count) {
                    carData = carData.slice(0, count);
                }

                setCars(carData);
            } catch (error) {
                console.error("🚨 차량 목록 불러오기 실패:", error);
            }
        };

        fetchCars();
    }, [count]);

    return (
        <>
            {cars.map((car, index) => (
                <CarCard
                    key={car._id || index}
                    image={`http://localhost:8001/uploads/${car.images && car.images.length > 0 ? car.images[0] : 'default.jpg'}`}
                    name={`${car.car_model}`}
                    price={`${car.price ? car.price.toLocaleString() : '가격 정보 없음'} 만원`}
                    badges={['diagnose', 'trust']}
                    showBadges={showBadges}
                    showPrice={showPrice}
                />
            ))}
        </>
    );
};

export default CarList;