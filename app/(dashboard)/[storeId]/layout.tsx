import { auth } from "@clerk/nextjs"; // This module will handle user authentication
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb"; 

// DashboardLayout Component
export default async function DashboardLayout({
    children, // Children elements that this layout wraps around
    params   // Parameters passed to this layout
}: {
    children: React.ReactNode, 
    params: { storeId: string } // Expecting a parameter with a storeId of string type
}) {
    // Getting the user's ID from the auth function
    const { userId } = auth();

    // If the user isn't logged in (no userId), redirect them to the sign-in page
    if(!userId) {
        redirect('/sign-in')
    }

    // Attempt to find a store in the database that matches the given storeId and belongs to the currently logged-in user
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId, // Matching the store ID
            userId              // Matching the user ID
        }
    });

    // If no store is found matching the criteria, redirect the user to the homepage
    if(!store) {
        redirect('/')
    }

    // Returning the rendered layout
    return (
        <>
          <div>This will be a Navbar</div>
          {children}
        </>
    );
};
