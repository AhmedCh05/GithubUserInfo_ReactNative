import React from "react";
import { View, Text, Image, StyleSheet,Pressable } from "react-native";

const UserDetailsPage = ({ route }) => {
	const user = route.params.paramsKey;

	return (
        <View style={styles.mainContainer}>
		<View style={styles.container}>
			<Pressable
				style={styles.backButton}
				onPress={() => {
					navigation.navigate("Dashboard");
				}}>
				<Text style={styles.backButtonText}>Back</Text>
			</Pressable>
			<Image source={{ uri: user.avatar_url }} style={styles.avatar} />
			<Text style={styles.text}>Username: {user.login}</Text>
			<Text style={styles.text}>Name: {user.name}</Text>
			<Text style={styles.text}>Location: {user.location}</Text>
			<Text style={styles.text}>
				Email: {user.email ? user.email : "N/A"}
			</Text>
			<Text style={styles.text}>
				Public Repositories: {user.public_repos}
			</Text>
			<Text style={styles.text}>Followers: {user.followers}</Text>
			<Text style={styles.text}>Following: {user.following}</Text>
			<Text style={styles.text}>
				Member Since: {new Date(user.created_at).toLocaleDateString()}
			</Text>
			<Text style={styles.text}>
				Last Updated: {new Date(user.updated_at).toLocaleDateString()}
			</Text>
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
        width: "85%",
		maxWidth: 400,
		margin: "auto",
		borderRadius: 25,
	},
	avatar: {
		width: 150,
		height: 150,
		borderRadius: 70,
		marginBottom: 20,
	},
	text: {
		fontSize: 16,
		color: "white",
		marginBottom: 5,
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

export default UserDetailsPage;
