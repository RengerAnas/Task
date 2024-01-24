import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type MainStackParamsList = {
   Home: undefined;
   Category : undefined;
   ColorStrip : undefined
};


export type RootStackParamsList = MainStackParamsList;


export interface NavigationProps<T extends keyof RootStackParamsList> {
   navigation: StackNavigationProp<RootStackParamsList , T>;
   route: RouteProp<RootStackParamsList , T>;
}
