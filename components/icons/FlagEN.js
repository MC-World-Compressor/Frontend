export default function FlagEN({ className = "w-5 h-5" }) {
    return (
        <span className={`${className} inline-block align-middle mt-2`} aria-label="USA flag">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="16">
                <rect width="60" height="40" fill="#B22234" rx="4" />
                <g>
                    <rect y="3.08" width="60" height="3.08" fill="#fff" />
                    <rect y="9.24" width="60" height="3.08" fill="#fff" />
                    <rect y="15.4" width="60" height="3.08" fill="#fff" />
                    <rect y="21.56" width="60" height="3.08" fill="#fff" />
                    <rect y="27.72" width="60" height="3.08" fill="#fff" />
                    <rect y="33.88" width="60" height="3.08" fill="#fff" />
                </g>
                <rect width="24" height="17.6" fill="#3C3B6E" rx="2" />
                <g fill="#fff">
                    <g id="s18">
                        <g id="s9">
                            <g id="s5">
                                <polygon points="2.4,2.6 3,4.2 1.2,3.2 3.6,3.2 1.8,4.2" />
                                <use href="#s5" x="4.8" />
                                <use href="#s5" x="9.6" />
                                <use href="#s5" x="14.4" />
                                <use href="#s5" x="19.2" />
                            </g>
                            <use href="#s5" y="3.52" />
                        </g>
                        <use href="#s9" y="7.04" />
                    </g>
                    <use href="#s18" x="2.4" y="1.76" />
                </g>
            </svg>
        </span>
    );
}
