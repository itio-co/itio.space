import { useEffect, useState } from 'react';

interface StarStyle {
    top: string;
    left: string;
    width: string;
    height: string;
    animationDelay: string;
    animationDuration: string;
}

const TwinkleStars = () => {
    const [starStyles, setStarStyles] = useState<StarStyle[]>([]);

    useEffect(() => {
        const styles: StarStyle[] = Array.from({ length: 100 }, () => {
            const size = `${Math.random() * 2 + 1}px`;
            return {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: size,
                height: size,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 1.5}s`,
            };
        });
        setStarStyles(styles);
    }, []);

    return (
        <div className="twinkle-stars">
            {starStyles.map((style, i) => (
                <div
                    key={i}
                    className="star"
                    style={style}
                ></div>
            ))}
        </div>
    );
};

export default TwinkleStars;
