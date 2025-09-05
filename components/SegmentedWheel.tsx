interface SegmentedWheelProps {
  numberOfSegments: number;
  innerRadius: number;
}

const SegmentedWheel: React.FC<SegmentedWheelProps> = ({ numberOfSegments, innerRadius }) => {
  const segmentStyle = (index: number) => {
    const outerRadius = 100; // Adjust the outer radius as needed
    const startAngle = (2 * Math.PI * index) / numberOfSegments;
    const endAngle = (2 * Math.PI * (index + 1)) / numberOfSegments;

    const startX = outerRadius * Math.cos(startAngle);
    const startY = outerRadius * Math.sin(startAngle);
    const endX = outerRadius * Math.cos(endAngle);
    const endY = outerRadius * Math.sin(endAngle);

    const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';

    const pathData = [
      `M ${startX} ${startY}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      `L ${innerRadius * Math.cos(endAngle)} ${innerRadius * Math.sin(endAngle)}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerRadius * Math.cos(startAngle)} ${innerRadius * Math.sin(startAngle)}`,
      'Z',
    ].join(' ');

    const hue = (360 / numberOfSegments) * index;
    return {
      fill: `hsl(${hue}, 73%, 82%)`,
      d: pathData,
    };
  };

  const segments = Array.from({ length: numberOfSegments }, (_, index) => (
    <path key={index} d={segmentStyle(index).d} fill={segmentStyle(index).fill}></path>
  ));

  return (
    <svg className="segmented-wheel" viewBox="-100 -100 200 200" width={50} height={50}>
      {segments}
    </svg>
  );
};

export default SegmentedWheel;
