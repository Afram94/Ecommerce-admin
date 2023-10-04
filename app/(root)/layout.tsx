import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useRouter } from 'next/router';

export default async function SetupPage({
    children,
}: {
    children: string
}) {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({
      where: {
        userId
      }
    });

    if(store) {
      redirect(`/${store.id}`)
    }

    return(
      <>
        {children}
      </>
    )
}