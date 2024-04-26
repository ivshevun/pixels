"use client";
import { Suspense } from "react";
import { CenterResponsive } from "../components/Center";
import OAuth from "../components/OAuth";
import AuthForm from "./AuthForm";
import FormFallback from "./FormFallback";

export default function Authorization() {
  return (
    <CenterResponsive>
      <OAuth title="Sign In to Pixels" />
      <Suspense fallback={<FormFallback />}>
        <AuthForm />
      </Suspense>
    </CenterResponsive>
  );
}
