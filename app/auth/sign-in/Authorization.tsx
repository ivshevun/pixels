"use client";
import { CenterResponsive } from "../components/Center";
import OAuth from "../components/OAuth";
import AuthForm from "./AuthForm";

export default function Authorization() {
  return (
    <CenterResponsive>
      <OAuth title="Sign In to Pixels" />
      <AuthForm />
    </CenterResponsive>
  );
}
