import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.matches(/[a-zA-Z]/, "Must contain Alphabets only")
		.required("Name is required"),
	email: Yup.string()
		.email("Invalid email")
		.matches(
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[com]/,
			"Invalid email format"
		)
		.required("Email is required"),
	password: Yup.string()
		.min(4, "Password must be at least 4 characters")
		.matches(/[a-zA-Z0-9]/, "Password must contain alphanumeric characters")
		.required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required("Confirm Password is required"),
	phone: Yup.string()
		.matches(/[0-9]/, "Must contain numeric values")
		.required("Phone Number is required"),
});

const SignupScreen = () => {
	const navigation = useNavigation();

	const handleSignup = (values) => {
		console.log(values);
	};

	return (
		<Formik
			initialValues={{
				name: "",
				email: "",
				password: "",
				confirmPassword: "",
				phone: "",
			}}
			validationSchema={validationSchema}
			onSubmit={handleSignup}>
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
						<Text style={styles.header}>Sign Up</Text>
						<Field
							style={styles.input}
							component={TextInput}
							placeholder="Name"
							name="name"
							onChangeText={handleChange("name")}
							value={values.name}
						/>
						{touched.name && errors.name && (
							<Text style={styles.errorText}>{errors.name}</Text>
						)}
						<Field
							style={styles.input}
							component={TextInput}
							placeholder="Email"
							name="email"
							onChangeText={handleChange("email")}
							value={values.email}
						/>
						{touched.email && errors.email && (
							<Text style={styles.errorText}>{errors.email}</Text>
						)}
						<Field
							style={styles.input}
							component={TextInput}
							placeholder="Password"
							secureTextEntry
							name="password"
							onChangeText={handleChange("password")}
							value={values.password}
						/>
						{touched.password && errors.password && (
							<Text style={styles.errorText}>
								{errors.password}
							</Text>
						)}
						<Field
							style={styles.input}
							component={TextInput}
							placeholder="Confirm Password"
							secureTextEntry
							name="confirmPassword"
							onChangeText={handleChange("confirmPassword")}
							value={values.confirmPassword}
						/>
						{touched.confirmPassword && errors.confirmPassword && (
							<Text style={styles.errorText}>
								{errors.confirmPassword}
							</Text>
						)}
						<Field
							style={styles.input}
							component={TextInput}
							placeholder="Phone Number"
							name="phone"
							onChangeText={handleChange("phone")}
							value={values.phone}
						/>
						{touched.phone && errors.phone && (
							<Text style={styles.errorText}>{errors.phone}</Text>
						)}
						<Pressable style={styles.button} onPress={handleSubmit}>
							<Text style={styles.buttonText}>Sign Up</Text>
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
		height: "70%",
		maxWidth: 400,
		margin: "auto",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgb(0, 140, 255)",
		padding: "10%",
		borderRadius: 25,
	},
	header: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 20,
		color: "white",
	},
	errorText: {
		color: "red",
		fontSize: 12,
		marginTop: 5,
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
	button: {
		backgroundColor: "limegreen",
		width: "100%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		marginTop: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default SignupScreen;
