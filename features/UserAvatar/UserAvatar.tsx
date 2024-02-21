import { useUser } from "@/entities/hooks";
import { Avatar } from "@nextui-org/avatar";

export function UserAvatar() {
  const { imageUrl, name } = useUser();

  return <Avatar src={imageUrl} alt={name} />;
}
