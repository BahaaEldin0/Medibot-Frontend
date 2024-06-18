import { useState } from "react";
import { useRouter } from "next/router";
import Field from "@/components/Field";

type DeleteAccountProps = {};

const DeleteAccount = ({}: DeleteAccountProps) => {
    const router = useRouter();

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userId = localStorage.getItem('_id');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
            console.error("User ID or token is missing");
            return;
        }

        try {
            const response = await fetch('https://medibot-backend-docker.redcliff-fa17bb4c.uaenorth.azurecontainerapps.io/auth/delete/user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    '_id': userId,
                    'token': token,
                },
            });

            if (response.ok) {
                // Clear local storage
                localStorage.removeItem('token');
                localStorage.removeItem('_id');
                localStorage.removeItem('name');

                // Redirect to the sign-in page
                router.push('/sign-in');
            } else {
                console.error("Failed to delete account")
            }
        } catch (error) {
            console.error("An error occurred while deleting the account", error);
        }
    };

    return (
        <form className="" action="" onSubmit={handleDelete}>
            <div className="mb-8 h4">We’re sorry to see you go</div>
            <div className="mb-6 caption1 text-n-4">
                Warning: Deleting your account will permanently remove all of
                your data and cannot be undone. This includes your profile,
                chats, comments, and any other information associated with your
                account. Are you sure you want to proceed with deleting your
                account?
            </div>
            
            <button className="btn-red w-full" type="submit">
                Delete account
            </button>
        </form>
    );
};

export default DeleteAccount;
