import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Login() {
  const { userId, isAuthenticated } = await auth();

  if (userId) {
    redirect("/");
  }

  return (
    <div className="grid max-h-screen min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="mx-auto flex h-full w-full max-w-[550px] flex-col justify-center p-6 md:p-8">
        <Image
          src={"/logo.svg"}
          width={173}
          height={39}
          alt="Finance AI"
          className="mb-8"
        />
        <h1 className="mb-3 h-fit text-3xl font-bold md:text-4xl">Bem-vindo</h1>
        <p className="text-muted-foreground mb-8 h-fit text-sm md:text-base">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignInButton>
          <Button variant={"outline"} className="w-full md:w-auto">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
      <div className="relative hidden h-full w-full lg:block">
        <Image
          src={"/login-bg.png"}
          alt="Login Background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
