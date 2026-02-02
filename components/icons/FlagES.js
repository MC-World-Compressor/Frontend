export default function FlagES({ className = "w-5 h-5" }) {
    return (
        <span className={`${className} inline-block align-middle mt-2`} aria-label="Bandera de España">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="16">
                <rect width="60" height="40" fill="#AA151B" rx="4" />
                <rect y="10" width="60" height="20" fill="#F1BF00" rx="4" />
            </svg>
        </span>
    );
}
