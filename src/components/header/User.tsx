import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";

import { AVATARS } from "@/lib/assetsAvatars";
import { clearUserData, useUser } from "@/redux/reducers/userReducer";
import { auth } from "@/utils/firebase";

import Button from "@/components/ui/Button";
import { NAV_LINKS_OTHER } from "@/lib/navLinks";

function User() {
  // Getting the user name from the redux
  const { name, avatar } = useUser();

  // Getting the dispatch function
  const dispatch = useDispatch();

  // Sign Out handler (signs out and redirects to main page)
  const handleSignOut = () => {
    signOut(auth);
    dispatch(clearUserData());
  };

  // Getting the avatars from AVATARS array
  const selectedAvatarPng =
    AVATARS.find((storedAvatar) => storedAvatar.name === avatar)?.png || avatar;
  const selectedAvatarWebp =
    AVATARS.find((storedAvatar) => storedAvatar.name === avatar)?.webp ||
    avatar;

  // Returned JSX
  return (
    <div className="flex gap-6 items-center">
      <Link to={NAV_LINKS_OTHER.profile.path}>
        <picture>
          <source srcSet={selectedAvatarWebp} type="image/webp" />
          <img
            src={selectedAvatarPng}
            className="rounded-full"
            width={50}
            height={50}
            alt={name}
            title={`${name} avatar`}
          />
        </picture>
      </Link>

      <Button onClick={handleSignOut} label="Sign out">
        <span>LOG OUT</span>
      </Button>
    </div>
  );
}

export default User;
