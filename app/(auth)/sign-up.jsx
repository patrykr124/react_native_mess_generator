import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { images } from "../../constants";
import {createAccount} from "../../lib/appwrite";

const signUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Please fill in all fields");
    }
    setIsSubmitting(true);
    try {
      await createAccount(form.email, form.password, form.username);
      router.push("/home");
      console.log("account created", form.email, form.password, form.username);
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center px-4 min-h-[75vh] my-6">
          <Image
            source={images.logo}
            className="max-w-[130px] max-h-[84px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white text-semibold my-4 font-psemibold">
            Log in to Aora
          </Text>

          <View className="flex gap-2">
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(value) =>
                setForm({ ...form, username: value })
              }
              className=""
              otherStyles={"mt-7"}
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(value) => setForm({ ...form, email: value })}
              className=""
              keyBoardType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(value) =>
                setForm({ ...form, password: value })
              }
              className=""
            />
          </View>
          <CustomButton
            title={"Sign up"}
            handlePress={submit}
            containerStyle={"mt-7"}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              className="text-lg text-secondary font-psemibold"
              href={"/sign-in"}
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default signUp;
