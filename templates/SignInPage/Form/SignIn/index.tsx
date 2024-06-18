import { useState } from "react";
import Field from "@/components/Field";
import { useRouter } from "next/router";

type SignInProps = {
    onClick?: (email: string, password: string) => void; // Optional sign in click function
};

const SignIn = ({ onClick }: SignInProps) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator

    const router = useRouter(); 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        setIsLoading(true); // Set loading state to true

        try {
            const response = await fetch('https://medibot-backend-docker.redcliff-fa17bb4c.uaenorth.azurecontainerapps.io/auth/login/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful response
                console.log('Login successful:', data);

                // Cache token, _id, and name in local storage
                localStorage.setItem('token', data.token);
                localStorage.setItem('_id', data._id);
                localStorage.setItem('name', data.name);

                if (onClick) onClick(email, password); // Call the provided onClick function if it exists
                router.push('/'); // Redirect to home page
            } else {
                // Handle error response
                console.error('Login failed:', data);
            }
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            setIsLoading(false); // Set loading state to false
        }
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <Field
                className="mb-4"
                classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                placeholder="email"
                icon="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
            />
            <Field
                className="mb-2"
                classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                placeholder="Password"
                icon="lock"
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                required
            />
            <button
                className="mb-6 base2 text-primary-1 transition-colors hover:text-primary-1/90"
                type="button"
                onClick={() => { if (onClick) onClick(email, password); }} // Optional onClick for forgot password
            >
                {/* Forgot password? */}
            </button>
            <button className="btn-blue btn-large w-full" type="submit" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
        </form>
    );
};

export default SignIn;
