import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email")
		.matches(
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
			"Invalid email format"
		)
		.required("Email is required"),
});

const ForgetPassword = () => {
	const navigation = useNavigation();

	const handleResetPassword = (values) => {
		console.log(values.email);
	};

	return (
		<Formik
			initialValues={{ email: "" }}
			validationSchema={validationSchema}
			onSubmit={handleResetPassword}>
			{({ handleChange, handleSubmit, values, errors, touched }) => (
				<View style={styles.maincontainer}>
					<View style={styles.container}>
						<Pressable
							style={styles.backButton}
							onPress={() => {
								navigation.navigate("Login");
							}}>
							<Text style={styles.backButtonText}>Back</Text>
						</Pressable>
						<Text style={styles.header}>Forget Password</Text>
						<Field
							style={styles.input}
							component={TextInput}
							placeholder="Email"
							name="email"
							onChangeText={handleChange("email")}
							value={values.email}
						/>
						{errors.email && (
							<Text style={styles.errorText}>{errors.email}</Text>
						)}
						<Pressable style={styles.button} onPress={handleSubmit}>
							<Text style={styles.buttonText}>
								Reset Password
							</Text>
						</Pressable>
					</View>
				</View>
			)}
		</Formik>
	);
};

const styles = StyleSheet.create({
	maincontainer: {
		flex: 1,
		backgroundColor: "black",
		color: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		width: "80%",
		maxWidth: 400,
		margin: "auto",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgb(0, 140, 255)",
		padding: "10%",
		borderRadius: 25,
	},
	header: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		color: "white",
	},
	input: {
		width: "100%",
		height: 45,
		backgroundColor: "#ccc",
		marginBottom: 10,
		padding: 10,
		borderRadius: 8,
		borderColor: "#ccc", // Light gray border
		borderWidth: 1, // Thin border
	},
	button: {
		backgroundColor: "limegreen",
		width: "70%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		marginTop: 20,
	},
	backButton: {
		alignSelf: "flex-start",
		marginTop: 5,
		backgroundColor: "limegreen",
		borderRadius: 8,
		marginBottom: 10,
	},
	backButtonText: {
		color: "white",
		fontSize: 12,
		fontWeight: "bold",
		padding: "5px",
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	errorText: {
		color: "red",
		fontSize: 12,
		marginTop: 5,
	},
});

export default ForgetPassword;
