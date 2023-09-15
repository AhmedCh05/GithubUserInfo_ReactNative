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
	password: Yup.string()
		.min(4, "Password must be at least 4 characters")
		.matches(/[a-zA-Z0-9]/, "Password must contain alphanumeric characters")
		.required("Password is required"),
});

const LoginScreen = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.maincontainer}>
			<View style={styles.container}>
				<Text style={styles.header}>Login</Text>
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						console.log("Form submitted:", values);
					}}>
					{({ handleChange, handleSubmit, values, errors }) => (
						<>
							<Field
								style={styles.input}
								component={TextInput}
								placeholder="Email"
								name="email"
								onChangeText={handleChange("email")}
								value={values.email}
							/>
							{errors.email && (
								<Text style={styles.errorText}>
									{errors.email}
								</Text>
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
							{errors.password && (
								<Text style={styles.errorText}>
									{errors.password}
								</Text>
							)}

							<View style={styles.linkContainer}>
								<Pressable
									onPress={() =>
										navigation.navigate("ForgetPassword")
									}>
									<Text style={styles.link}>Forget</Text>
								</Pressable>
							</View>
							<Pressable
								style={styles.button}
								onPress={handleSubmit}>
								<Text style={styles.buttonText}>Login</Text>
							</Pressable>
						</>
					)}
				</Formik>

				<View>
					<Pressable
						style={styles.createlinkContainer}
						onPress={() => navigation.navigate("Signup")}>
						<Text style={styles.link}>Create</Text>
					</Pressable>
				</View>
			</View>
		</View>
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
	errorText: {
		color: "red",
		fontSize: 12,
		paddingBottom: 2,
		alignContent: "left",
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
		fontSize: 32,
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
		borderColor: "#ccc",
		borderWidth: 1,
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
	linkContainer: {
		marginTop: 10,
		textAlign: "right",
	},
	link: {
		color: "white",
	},
	createlinkContainer: {
		marginTop: 20,
		textAlign: "left",
		justifyContent: "flex-start",
	},
});

export default LoginScreen;
