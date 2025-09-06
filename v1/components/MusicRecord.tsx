interface ConcentricCirclesProps {
  numberOfCircles: number;
}

const ConcentricCircles: React.FC<ConcentricCirclesProps> = ({ numberOfCircles }) => {
  const circleStyle = (index: number) => {
    const strokeWidth = index === numberOfCircles -1 ? 5 : 10; // Adjust the stroke width as needed
    const maxRadius = 32 + index * 5; // Adjust the maximum radius increment as needed

    const circleData = {
      cx: 0,
      cy: 0,
      r: maxRadius,
      fill: 'none',
      stroke: `hsl(${(360 / numberOfCircles) * index}, 63%, 70%)`,
      strokeWidth,
    };

    return circleData;
  };

  const circles = Array.from({ length: numberOfCircles }, (_, index) => (
    <circle key={index} {...circleStyle(index)}></circle>
  ));

  return (
    <svg className="concentric-circles" viewBox="-100 -100 200 200" width={50} height={50}>
      <circle cx="0" cy="0" r="27" fill="#fff" />
      {circles}
    </svg>
  );
};

export default ConcentricCircles;
