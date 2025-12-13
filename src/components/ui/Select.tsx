import { Picker } from "@react-native-picker/picker";

interface ISelectProps {
	selectedValue: string;
	onValueChange: (value: string) => void;
	options: { label: string; value: string }[];
}

export default function Select({
	selectedValue,
	onValueChange,
	options,
}: ISelectProps) {
	return (
		<Picker
			selectedValue={selectedValue}
			onValueChange={(value) => onValueChange(value)}
			dropdownIconColor="white"
			style={{ color: "white", width: 150 }}
		>
			{options.map((e) => (
				<Picker.Item key={e.value} label={e.label} value={e.value} />
			))}
		</Picker>
	);
}
