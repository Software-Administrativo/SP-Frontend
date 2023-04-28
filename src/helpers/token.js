import { useStorage } from "@/stores/localStorage"

export const getToken = () => {
  const { token } = useStorage();
  return token;
}