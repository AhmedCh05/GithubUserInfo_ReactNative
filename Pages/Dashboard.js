import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import reactNativeAxios from "react-native-axios";
import UserDetailPage from "./UserDetailPage";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons"; // Import the AntDesign icons

const DashboardScreen = () => {
	const [username, setUsername] = useState("");
	const [response, setResponse] = useState();
	const [recentSearches, setRecentSearches] = useState([]);
	const navigation = useNavigation();

	useEffect(() => {
		AsyncStorage.getItem("recentSearches")
			.then((searches) => {
				if (searches) {
					setRecentSearches(JSON.parse(searches));
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleInformation = async () => {
		try {
			const res = await reactNativeAxios.get(
				`https://api.github.com/users/${username}`
			);
			setResponse(res.data);
			navigation.navigate("UserDetails", { paramsKey: res.data });

			const updatedSearches = [...recentSearches, username];
			setRecentSearches(updatedSearches);
			await AsyncStorage.setItem(
				"recentSearches",
				JSON.stringify(updatedSearches)
			);
		} catch (error) {
			console.error(error);
		}
	};

	const handleRecentSearchClick = async (search) => {
		try {
			const res = await reactNativeAxios.get(
				`https://api.github.com/users/${search}`
			);
			setResponse(res.data);
			navigation.navigate("UserDetails", { paramsKey: res.data });
		} catch (error) {
			console.error(error);
		}
	};

	const handleClearRecentSearches = async () => {
		setRecentSearches([]);
		await AsyncStorage.removeItem("recentSearches");
	};

	return (
		<View style={styles.mainContainer}>
			<View style={styles.container}>
            <Pressable
				style={styles.backButton}
				onPress={() => {
					navigation.navigate("Login");
				}}>
				<Text style={styles.backButtonText}>Back</Text>
			</Pressable>
				<Text style={styles.header}>Github</Text>
				<TextInput
					style={styles.input}
					placeholder="Github's username"
					value={username}
					onChangeText={setUsername}
				/>
				<Pressable style={styles.button} onPress={handleInformation}>
					<Text style={styles.buttonText}>Retrieve Info</Text>
				</Pressable>
				<View style={styles.card}>
					<Text style={styles.cardTitle}>Recent Searches</Text>
					<View style={styles.bulletContainer}>
						{recentSearches.length > 0 ? (
							<>
								{recentSearches.map((search, index) => (
									<View style={styles.searchRow} key={index}>
										<Pressable
											onPress={() =>
												handleRecentSearchClick(search)
											}>
											<Text style={styles.bulletText}>
												{"\u2022"} {search}
											</Text>
										</Pressable>
										<Pressable
											onPress={() => {
												const updatedSearches =
													recentSearches.filter(
														(item) =>
															item !== search
													);
												setRecentSearches(
													updatedSearches
												);
												AsyncStorage.setItem(
													"recentSearches",
													JSON.stringify(
														updatedSearches
													)
												);
											}}
											style={styles.clearIcon}>
											<AntDesign
												name="close"
												size={16}
												color="white"
											/>
										</Pressable>
									</View>
								))}
								<Pressable
									onPress={handleClearRecentSearches}
									style={styles.clearSearches}>
									<Text style={styles.clearSearchestext}>clear all</Text>
								</Pressable>
							</>
						) : (
							<Text style={{ color: "cyan" }}>
								No recent searches
							</Text>
						)}
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "black",
		color: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		backgroundColor: "#121212",
		padding: "10%",
		alignItems: "center",
		justifyContent: "center",
		width: "80%",
		maxWidth: 400,
		margin: "auto",
		borderRadius: 25,
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		color: "white",
	},
	card: {
		backgroundColor: "inherit",
		padding: 16,
		borderRadius: 8,
		marginBottom: 16,
		width: "100%",
		marginTop: 10,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
		marginBottom: 8,
	},
	cardContent: {
		fontSize: 16,
		color: "white",
	},
	input: {
		width: "100%",
		height: 45,
		backgroundColor: "#ccc",
		marginBottom: 10,
		padding: 10,
		borderRadius: 8,
		borderColor: "#ccc",
		borderWidth: 1,
	},
	button: {
		backgroundColor: "limegreen",
		width: "45%",
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		marginTop: 2,
	},
	buttonText: {
		color: "#fff",
		fontSize: 15,
		fontWeight: "bold",
	},
	bulletContainer: {
		marginLeft: 20,
		marginTop: 5,
		textAlign: "left",
	},
	bulletText: {
		color: "cyan",
		fontSize: 16,
		marginBottom: 5,
	},
	searchRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	clearIcon: {
		marginLeft: 10,
	},
	clearSearches: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
	},
    clearSearchestext :{
        alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
		color: "red",
    },
    backButton: {
		alignSelf: "flex-start",
		marginTop: 5,
		backgroundColor: "limegreen",
		borderRadius: 8,
		marginBottom: 10,
        marginLeft:10
	},
	backButtonText: {
		color: "white",
		fontSize: 12,
		fontWeight: "bold",
		padding: "5px",
	}
});

export default DashboardScreen;
