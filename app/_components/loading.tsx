import Image from "next/image";

export function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Image
        className="animate-bounce ease-in"
        src={"/logo.svg"}
        width={150}
        height={150}
        alt="Loading"
        priority
      />
    </div>
  );
}
