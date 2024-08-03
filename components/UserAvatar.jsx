import { cn } from "@/lib/utils";
import Image from "next/image";

const UserAvatar = ({ avatarUrl, className, size }) => {
  return (
    <Image
      src={avatarUrl || "/assets/profile-pic-placeholder.png"}
      alt="Avatar utente"
      width={size || 48}
      height={size || 48}
      className={cn(
        "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
        className
      )}
    />
  );
};

export default UserAvatar;
