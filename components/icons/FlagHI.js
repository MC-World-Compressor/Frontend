export default function FlagHI({ className = "w-5 h-5" }) {
    return (
        <span className={`${className} inline-block align-middle mt-2`} aria-label="भारत का ध्वज">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="16">
                <rect width="60" height="40" fill="#FF9933" />
                <rect y="13.33" width="60" height="13.34" fill="#fff" />
                <rect y="26.67" width="60" height="13.33" fill="#138808" />
                <circle cx="30" cy="20" r="6" fill="#fff" />
                <circle cx="30" cy="20" r="5" fill="none" stroke="#000080" strokeWidth="1" />
                <g stroke="#000080" strokeWidth="0.5">
                    {[...Array(24)].map((_, i) => {
                        const angle = (i * 15) * Math.PI / 180;
                        const x2 = 30 + 5 * Math.cos(angle);
                        const y2 = 20 + 5 * Math.sin(angle);
                        return <line key={i} x1="30" y1="20" x2={x2} y2={y2} />;
                    })}
                </g>
                <circle cx="30" cy="20" r="1" fill="#000080" />
            </svg>
        </span>
    );
}
