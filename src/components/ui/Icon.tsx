import { icons, type LucideProps } from "lucide-react-native";

interface IconProps extends LucideProps {
	name: keyof typeof icons;
}

export function Icon({ name, color, size }: IconProps) {
	const LucideIcon = icons[name];

	return <LucideIcon color={color} size={size} />;
}

export default Icon;
