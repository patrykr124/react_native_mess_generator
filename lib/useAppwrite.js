import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useAppwrite(fn) {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  const fetchData = async () => {
    setloading(true);
    try {
      const response = await fn();
      setdata(response);
    } catch (err) {
      Alert.alert(err.message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
}
