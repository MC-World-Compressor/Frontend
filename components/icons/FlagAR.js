export default function FlagAR({ className = "w-5 h-5" }) {
    return (
        <span className={`${className} inline-block align-middle mt-2`} aria-label="علم اليمن">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="16">
                <rect width="60" height="13.33" y="0" fill="#ce1126" />
                <rect width="60" height="13.33" y="13.33" fill="#fff" />
                <rect width="60" height="13.34" y="26.66" fill="#000" />
            </svg>
        </span>
    );
}
