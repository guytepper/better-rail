/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator, StackScreenProps, TransitionPresets } from "@react-navigation/stack"
import { PlannerScreen, SelectStationScreen, RouteListScreen, RouteDetailsScreen } from "../screens"
import { color, typography } from "../theme"
import { RouteItem } from "../services/api"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  planner: undefined
  selectStation: { selectionType: "origin" | "destination" }
  routeList: { originId: string; destinationId: string; time: number }
  routeDetails: { routeItem: RouteItem; originId: string; destinationId: string }
}

export type PlannerScreenProps = StackScreenProps<PrimaryParamList, "planner">
export type SelectStationScreenProps = StackScreenProps<PrimaryParamList, "selectStation">
export type RouteListScreenProps = StackScreenProps<PrimaryParamList, "routeList">
export type RouteDetailsScreenProps = StackScreenProps<PrimaryParamList, "routeDetails">

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleStyle: { fontSize: 18, fontFamily: typography.primary },
        headerTintColor: color.primary,
      }}
    >
      <Stack.Screen name="planner" component={PlannerScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="selectStation"
        component={SelectStationScreen}
        options={{ headerShown: false, ...TransitionPresets.ModalTransition }}
      />
      <Stack.Screen
        name="routeList"
        component={RouteListScreen}
        options={{
          headerTitle: "מסלול נסיעה",
        }}
      />
      <Stack.Screen name="routeDetails" component={RouteDetailsScreen} options={{ headerTitle: "פרטי נסיעה" }} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["planner"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
