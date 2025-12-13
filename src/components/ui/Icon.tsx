import { icons, type LucideProps } from "lucide-react-native";

export type IconType = keyof typeof icons;

interface IconProps extends LucideProps {
	name: IconType;
}

export function Icon({ name, color, size }: IconProps) {
	const LucideIcon = icons[name];

	return <LucideIcon color={color} size={size} />;
}

export default Icon;
