import { JSX, ReactNode } from "react";
import { IconType } from "react-icons/lib";

export interface DocPackage {
  name: string;
  slug: string;
  description: string;
  modules: DocModule[];
  icon?: IconType;
  extraContent?: JSX.Element | ReactNode;
}

export interface DocModule {
  tag: string | string[];
  name: string;
  description: string;
  slug: string;
}
