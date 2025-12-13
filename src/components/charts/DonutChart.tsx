import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface IPieChartProps {
	data?: ITransactionTypeData[];
}

interface Segment {
	id: string;
	label: string;
	color: string;
	percentage: number;
}

interface Props {
	segmentsSelected?: Segment;
}

function DonutLegend({ segmentsSelected }: Props) {
	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(opacity, {
			toValue: segmentsSelected ? 1 : 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, [segmentsSelected, opacity]);

	return (
		<View className="mt-4">
			<Animated.View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					opacity,
					height: 20,
					gap: 2,
				}}
			>
				<View
					style={{
						width: 10,
						height: 10,
						borderRadius: 50,
						backgroundColor: segmentsSelected?.color || "#FFF",
						margin: 5,
					}}
				/>

				<Text className="text-black">{segmentsSelected?.label}</Text>

				{segmentsSelected?.percentage && (
					<Text className="text-black">{segmentsSelected.percentage}%</Text>
				)}
			</Animated.View>
		</View>
	);
}

export default function DonutChart({ data }: IPieChartProps) {
	const [activeIndex, setActiveIndex] = useState("");

	const size = 220;
	const strokeWidth = 35;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	let cumulativeOffset = 0;

	const animation = useRef(new Animated.Value(0)).current;

	const segments = useMemo(() => {
		const total = data?.reduce((a, e) => a + e.amount, 0);
		if (!total || !data) return [];

		return data.map((item) => ({
			id: item.categoryId,
			label: item.categoryName,
			color: item.categoryColor,
			percentage: Number(((item.amount / total) * 100).toFixed(2)),
		}));
	}, [data]);

	const segmentsSelected = useMemo(() => {
		if (!activeIndex || !segments.length) return;

		return segments.find((item) => item.id === activeIndex);
	}, [activeIndex, segments]);

	useEffect(() => {
		Animated.timing(animation, {
			toValue: 1,
			duration: 800,
			easing: Easing.out(Easing.ease),
			useNativeDriver: false, // SVG não suporta native driver
		}).start();
	}, [animation]);

	return (
		<View className="mx-auto mt-2">
			<Svg width={size} height={size}>
				<G rotation={-90} originX={size / 2} originY={size / 2}>
					{segments.map((segment) => {
						const arc = (segment.percentage / 100) * circumference;

						const animatedOffset = animation.interpolate({
							inputRange: [0, 1],
							outputRange: [circumference, -cumulativeOffset],
						});

						const isActive = !activeIndex || activeIndex === segment.id;

						const circle = (
							<AnimatedCircle
								key={segment.id}
								cx={size / 2}
								cy={size / 2}
								r={radius}
								stroke={segment.color}
								strokeWidth={strokeWidth}
								strokeDasharray={`${arc} ${circumference}`}
								strokeDashoffset={animatedOffset}
								fill="transparent"
								opacity={isActive ? 1 : 0.4}
								onPressIn={() => setActiveIndex(segment.id)}
								onPressOut={() => setActiveIndex("")}
							/>
						);

						// atualiza o ângulo inicial para o próximo segmento
						cumulativeOffset += arc;

						return circle;
					})}
				</G>
			</Svg>

			<DonutLegend segmentsSelected={segmentsSelected} />
		</View>
	);
}
