import {
  MdMenu,
  MdMenuOpen,
  MdClose,
  MdInfo,
  MdError,
  MdWarning,
  MdCheck,
  MdNotifications,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineSelector } from "react-icons/hi";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { BiSolidComponent } from "react-icons/bi";
import { GiHook, GiPlanetCore } from "react-icons/gi";
import { HiOutlineServerStack } from "react-icons/hi2";

export const Icons = {
  Menu: MdMenu,
  MenuOpen: MdMenuOpen,
  Close: MdClose,
  Info: MdInfo,
  Error: MdError,
  Warning: MdWarning,
  Success: MdCheck,
  Loading: AiOutlineLoading3Quarters,
  Notifications: MdNotifications,
  Copy: LuCopy,
  Copied: LuCopyCheck,
  DarkMode: MdDarkMode,
  LightMode: MdLightMode,
  Selector: HiOutlineSelector,
  Components: BiSolidComponent,
  Hooks: GiHook,
  Core: GiPlanetCore,
  Server: HiOutlineServerStack,
};
