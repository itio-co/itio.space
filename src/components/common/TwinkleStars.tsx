const TwinkleStars = () => {
    const stars = Array.from({ length: 100 }); // Example: 100 stars

    return (
        <div className="twinkle-stars">
            {stars.map((_, i) => (
                <div
                    key={i}
                    className="star"
                    // style={{
                    //     top: `${Math.random() * 100}%`,
                    //     left: `${Math.random() * 100}%`
                    // }}
                ></div>
            ))}
        </div>
    );
};

export default TwinkleStars;
