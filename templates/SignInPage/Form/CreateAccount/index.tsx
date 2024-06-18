import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Field from "@/components/Field";

type CreateAccountProps = {};

const CreateAccount = ({}: CreateAccountProps) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [subscription, setSubscription] = useState<string>("free");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {

            const response = await fetch('https://medibot-backend-docker.redcliff-fa17bb4c.uaenorth.azurecontainerapps.io/auth/register/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, phone, password, "subscription": "free", "role": {"user":"true"}})
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful response
                console.log('Account creation successful:', data);

                const response2 = await fetch('https://medibot-backend-docker.redcliff-fa17bb4c.uaenorth.azurecontainerapps.io/auth/login/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }   ,
                    body: JSON.stringify({ email, password})
                });

                const data2 = await response2.json();
                console.log('Login successful:', data2);
                // Cache token, _id, and name in local storage
                localStorage.setItem('token', data2.token);
                localStorage.setItem('_id', data2._id);
                localStorage.setItem('name', data2.name);

                router.push('/')
            } else {
                // Handle error response
                console.error('Account creation failed:', data);
            }
        } catch (error) {
            console.error('Error during account creation:', error);
        }
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <Field
                className="mb-4"
                classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                placeholder="Name"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                required
            />
            <Field
                className="mb-4"
                classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
            />
            <Field
                className="mb-4"
                classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                placeholder="Phone"
                value={phone}
                onChange={(e: any) => setPhone(e.target.value)}
                required
            />
            <Field
                className="mb-4"
                classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                required
            />
            
            <button className="btn-blue btn-large w-full mb-6" type="submit">
                Create Account
            </button>
            <div className="text-center caption1 text-n-4">
                By creating an account, you agree to our{" "}
                <Link
                    className="text-n-5 transition-colors hover:text-n-7 dark:text-n-3 dark:hover:text-n-1"
                    href="/"
                >
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                    className="text-n-5 transition-colors hover:text-n-7 dark:text-n-3 dark:hover:text-n-1"
                    href="/"
                >
                    Privacy & Cookie Statement
                </Link>
                .
            </div>
        </form>
    );
};

export default CreateAccount;
