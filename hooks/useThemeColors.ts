import { Colors } from "@/constants/Colors";

export function useThemeColors() {
    // const theme = useColorScheme() ?? "light"
    const theme = "light";
    return Colors[theme];
}